import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const Coupon = sequelize.define(
    "Coupon",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      code: { type: DataTypes.STRING, unique: true, allowNull: false },
      type: {
        type: DataTypes.ENUM("cart-wise", "product-wise", "bxgy"),
        allowNull: false,
      },
      details: { type: DataTypes.JSON, allowNull: false },
      conditions: { type: DataTypes.JSON, allowNull: true },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
      usageLimitGlobal: { type: DataTypes.INTEGER, allowNull: true },
      usageLimitPerUser: { type: DataTypes.INTEGER, allowNull: true },
    },
    { timestamps: true, tableName: "coupons" },
  );

  return Coupon;
};
