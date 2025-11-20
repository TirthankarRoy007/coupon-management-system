import { Request, Response } from "express";
import couponService from "../services/coupon.service";

const CouponsController = {
  async createCoupon(req: Request, res: Response) {
    try {
      const payload = req.body;
      const created = await couponService.createCoupon(payload);
      return res.status(201).json(created);
    } catch (err: any) {
      throw err;
    }
  },

  async listCoupons(_: Request, res: Response) {
    try {
      const coupons = await couponService.listCoupons();
      return res.json(coupons);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getCouponById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const coupon = await couponService.getCouponById(id);
      if (!coupon) return res.status(404).json({ message: "Not found" });
      return res.json(coupon);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async updateCoupon(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updated = await couponService.updateCoupon(id, req.body);
      return res.json(updated);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async deleteCoupon(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await couponService.deleteCoupon(id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async applicableCoupons(req: Request, res: Response) {
    try {
      const { cart } = req.body;
      if (!cart || !Array.isArray(cart.items)) {
        return res.status(400).json({ error: "Invalid cart payload" });
      }
      const applicable = await couponService.findApplicable(cart);
      return res.json({ applicable_coupons: applicable });
    } catch (err: any) {
      throw err;
    }
  },

  async applyCoupon(req: Request, res: Response) {
    try {
      const couponId = parseInt(req.params.id);
      const { cart } = req.body;
      if (!cart || !Array.isArray(cart.items)) {
        return res.status(400).json({ error: "Invalid cart payload" });
      }
      const updated = await couponService.applyCouponToCart(couponId, cart);
      return res.json(updated);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};

export default CouponsController;
