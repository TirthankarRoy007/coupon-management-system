import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const CouponUsage = sequelize.define(
    "CouponUsage",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      couponId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
      orderId: { type: DataTypes.STRING, allowNull: true },
      usedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "coupon_usages",
    },
  );

  return CouponUsage;
};
