import { Request, Response } from "express";
import couponService from "../services/coupon.service";

const CouponsController = {
  async createCoupon(req: Request, res: Response) {
    try {
      const payload = req.body;
      const created = await couponService.createCoupon(payload);
      return res.status(201).json(created);
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to create coupon",
      });
    }
  },

  async listCoupons(req: Request, res: Response) {
    try {
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
  
      const coupons = await couponService.listCoupons(page, limit);
  
      return res.json({
        success: true,
        data: coupons,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch coupons",
      });
    }
  },  

  async getCouponById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const coupon = await couponService.getCouponById(id);
      if (!coupon) return res.status(404).json({ message: "Not found" });
      return res.json(coupon);
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch coupon",
      });
    }
  },

  async updateCoupon(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updated = await couponService.updateCoupon(id, req.body);
      return res.json(updated);
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to update coupon",
      });
    }
  },

  async deleteCoupon(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await couponService.deleteCoupon(id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to delete coupon",
      });
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
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to check applicable coupons",
      });
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
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to apply coupon",
      });
    }
  },
};

export default CouponsController;
