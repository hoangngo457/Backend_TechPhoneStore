"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Cart.belongsTo(models.Users, {
        foreignKey: "idUser",
        targetKey: "id",
        as: "idUsersCartData",
      });
      Cart.belongsTo(models.Option_Product, {
        foreignKey: "idOpt",
        targetKey: "id",
        as: "idOption_ProductsCartData",
      });
    }
  }
  Cart.init(
    {
      quantity: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
      idOpt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
      freezeTableName: true,
    }
  );
  return Cart;
};
