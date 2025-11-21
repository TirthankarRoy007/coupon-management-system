import { sequelize } from "../config/db";
import couponModel from "./coupon";
import couponUsageModel from "./couponUsage";

export const Coupon = couponModel(sequelize);
export const CouponUsage = couponUsageModel(sequelize);

CouponUsage.belongsTo(Coupon, { foreignKey: "couponId" });

export const initDb = async () => {
  await sequelize.sync({ alter: false });
};
