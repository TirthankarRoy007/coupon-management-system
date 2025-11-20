import { Router } from "express";
import CouponsController from "../controllers/couponsController";

const router = Router();

router.post("/", CouponsController.createCoupon);
router.get("/", CouponsController.listCoupons);
router.get("/:id", CouponsController.getCouponById);
router.put("/:id", CouponsController.updateCoupon);
router.delete("/:id", CouponsController.deleteCoupon);

router.post("/applicable-coupons", CouponsController.applicableCoupons);
router.post("/apply-coupon/:id", CouponsController.applyCoupon);

export default router;
