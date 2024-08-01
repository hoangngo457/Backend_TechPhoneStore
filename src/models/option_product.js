"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Option_Product.hasMany(models.OrderDetails, { foreignKey: 'idOpt', as: 'idOptionData' })
    Option_Product.hasMany(models.FeedBack, { foreignKey: 'idOpt', as: 'idOption_ProductsData' })
    Option_Product.hasMany(models.Cart, { foreignKey: 'idOpt', as: 'idOption_ProductsCartData' })
    Option_Product.hasMany(models.Favorites, { foreignKey: 'idOpt', as: 'idOptionFavoriteData' })



    Option_Product.belongsTo(models.Products, { foreignKey: 'idPro', targetKey: 'id', as: 'idProductsData' })
    Option_Product.belongsTo(models.Ram, { foreignKey: 'idRam', targetKey: 'id', as: 'idRamData' })
    Option_Product.belongsTo(models.Rom, { foreignKey: 'idRom', targetKey: 'id', as: 'idRomData' })
    Option_Product.belongsTo(models.Color, { foreignKey: 'idColor', targetKey: 'id', as: 'idColorOptData' })





    }
  }
  Option_Product.init(
    {
      idRam: DataTypes.INTEGER,
      idRom: DataTypes.INTEGER,
      idColor: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      sold:DataTypes.INTEGER,
      idPro: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Option_Product",
      freezeTableName: true,
    }
  );
  return Option_Product;
};
