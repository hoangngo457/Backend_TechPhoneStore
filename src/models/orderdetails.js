"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetails.belongsTo(models.Orders, {
        foreignKey: "order_id",
        targetKey: "id",
        as: "idOrderData",
      });
      OrderDetails.belongsTo(models.Option_Product, {
        foreignKey: "idOpt",
        targetKey: "id",
        as: "idOptionData",
      });
    }
  }
  OrderDetails.init(
    {
      order_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      idOpt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetails",
      // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
      freezeTableName: true,
    }
  );
  return OrderDetails;
};
