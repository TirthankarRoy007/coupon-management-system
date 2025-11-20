import { Coupon, CouponUsage } from "../models";
import { Cart, CouponAttributes } from "../interface/couponTypes";
import {
  calculateBxGyDiscount,
  calculateCartWiseDiscount,
} from "./couponTypes";
import { calculateProductWiseDiscount } from "./couponTypes/ProductWise/productWiseCalculator";
import { Op } from "sequelize";

const couponService = {
  async createCoupon(payload: CouponAttributes): Promise<CouponAttributes> {

    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== null && value !== undefined)
    ) as Partial<CouponAttributes>;

    if (filteredPayload.code) {
      const existing = await Coupon.findOne({
        where: { code: filteredPayload.code.trim() },
      });
  
      if (existing) {
        throw new Error("Coupon with this code already exists");
      }
    }

    const created = await Coupon.create(filteredPayload as any);
    return created.toJSON() as CouponAttributes;
  },

  async listCoupons(page?: number, limit?: number): Promise<any> {
    const options: any = {
      distinct: true
    };

    if (page && limit) {
      options.limit = limit;
      options.offset = (page - 1) * limit;
    }
  
    const result = await Coupon.findAndCountAll(options);
  
    return {
      total: result.count,
      data: result.rows.map((c) => c.toJSON() as CouponAttributes),
    };
  },  

  async getCouponById(id: number): Promise<CouponAttributes | null> {
    const coupon = await Coupon.findByPk(id);
    return coupon ? (coupon.toJSON() as CouponAttributes) : null;
  },

  async updateCoupon(
    id: number,
    body: Partial<CouponAttributes>,
  ): Promise<CouponAttributes> {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) throw new Error("Coupon not found");
  
    //Check for duplicate coupon code BEFORE updating
    if (body.code) {
      const exists = await Coupon.findOne({
        where: {
          code: body.code,
          id: { [Op.ne]: id }, 
        },
      });
  
      if (exists) {
        throw new Error("Coupon code already exists");
      }
    }
  
    await coupon.update(body);
    return coupon.toJSON() as CouponAttributes;
  },

  async deleteCoupon(id: number): Promise<void> {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) throw new Error("Coupon not found");

    await coupon.destroy();
  },

  async findApplicable(cart: Cart): Promise<any[]> {
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    for (const item of cart.items) {
      if (item.price <= 0) {
        throw new Error(
          "Cart contains item with invalid (zero or negative) price",
        );
      }
      if (item.quantity <= 0) {
        throw new Error("Cart contains item with invalid quantity");
      }
    }

    const coupons = await Coupon.findAll({ where: { active: true } });

    const cartTotal = cart.items.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0,
    );

    const results: any[] = [];

    for (const row of coupons) {
      const c = row.toJSON() as CouponAttributes;

      if (!this._checkBasicConditions(c, cartTotal)) continue;

      const details =
        typeof c.details === "string" ? JSON.parse(c.details) : c.details;

      let discount = 0;

      if (c.type === "cart-wise") {
        discount = calculateCartWiseDiscount(cartTotal, details);
      }

      if (c.type === "product-wise") {
        discount = calculateProductWiseDiscount(cart, details);
      }

      if (c.type === "bxgy") {
        discount = calculateBxGyDiscount(cart, details);
      }

      if (discount > 0) {
        results.push({
          coupon_id: c.id,
          code: c.code,
          type: c.type,
          discount,
        });
      }
    }

    return results;
  },

  async applyCouponToCart(couponId: number, cart: Cart): Promise<any> {
    const row = await Coupon.findByPk(couponId);
    if (!row) throw new Error("Invalid coupon ID");

    const coupon = row.toJSON() as CouponAttributes;

    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      throw new Error("Cannot apply coupon: cart is empty");
    }

    for (const item of cart.items) {
      if (item.price <= 0) {
        throw new Error(
          "Cart contains item with invalid (zero or negative) price",
        );
      }
      if (item.quantity <= 0) {
        throw new Error("Cart contains item with invalid quantity");
      }
    }

    const details =
      typeof coupon.details === "string"
        ? JSON.parse(coupon.details)
        : coupon.details;

    const cartTotal = cart.items.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0,
    );

    if (!this._checkBasicConditions(coupon, cartTotal)) {
      throw new Error(
        "Coupon is inactive, expired, or minimum requirements not met",
      );
    }

    let discount = 0;

    if (coupon.type === "cart-wise") {
      discount = calculateCartWiseDiscount(cartTotal, details);
    }

    if (coupon.type === "product-wise") {
      discount = calculateProductWiseDiscount(cart, details);
    }

    if (coupon.type === "bxgy") {
      discount = calculateBxGyDiscount(cart, details);
    }

    if (!discount || discount <= 0) {
      throw new Error("Coupon is not applicable to this cart");
    }

    let finalPrice = cartTotal - discount;
    if (finalPrice < 0) finalPrice = 0;

    if (
      coupon.usageLimitGlobal !== null &&
      coupon.usageLimitGlobal !== undefined
    ) {
      await row.update({ usageLimitGlobal: coupon.usageLimitGlobal - 1 });
    }

    await CouponUsage.create({
      couponId,
      usedAt: new Date(),
    });

    return {
      updated_cart: {
        items: cart.items,
        total_price: cartTotal,
        total_discount: discount,
        final_price: finalPrice,
        coupon_applied: coupon.code,
      },
    };
  },

  _checkBasicConditions(coupon: CouponAttributes, cartTotal?: number): boolean {
    const now = new Date();

    if (!coupon.active) return false;

    let cond: any = {};

    if (coupon.conditions) {
      // If conditions is stored as JSON string, parse it
      if (typeof coupon.conditions === "string") {
        try {
          cond = JSON.parse(coupon.conditions);
        } catch (e) {
          cond = {};
        }
      } else {
        cond = coupon.conditions;
      }
    }
    
    // Normalize keys (trim spaces)
    const cleaned: any = {};
    for (const key in cond) {
      const trimmedKey = key.trim();
      cleaned[trimmedKey] = cond[key];
    }
    
    cond = cleaned;
    

    if (cond.startDate && new Date(cond.startDate) > now) {
      return false;
    }

    if (cond.endDate && new Date(cond.endDate) < now) {
      return false;
    }

    if (
      coupon.usageLimitGlobal !== null &&
      coupon.usageLimitGlobal !== undefined
    ) {
      if (coupon.usageLimitGlobal <= 0) {
        return false;
      }
    }

    if (cond.minCartValue && cartTotal !== undefined) {
      if (cartTotal < cond.minCartValue) {
        return false;
      }
    }

    return true;
  },
};

export default couponService;
