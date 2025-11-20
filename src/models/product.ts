import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      sku: { type: DataTypes.STRING },
    },
    { timestamps: true, tableName: "products" },
  );

  return Product;
};
