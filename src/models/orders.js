"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.belongsTo(models.Address, {
        foreignKey: "idAdr",
        targetKey: "id",
        as: "idAddressData",
      });
      Orders.hasOne(models.OrderDetails, {
        foreignKey: "order_id",
        as: "idOrderData",
      });
    }
  }
  Orders.init(
    {
      order_status: DataTypes.STRING,
      order_date: DataTypes.DATE,
      total_value: DataTypes.DECIMAL,
      payment: DataTypes.STRING,
      idAdr: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders",
      freezeTableName: true,
    }
  );
  return Orders;
};
