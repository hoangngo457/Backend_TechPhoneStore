"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.hasMany(models.Product_Image, {
        foreignKey: "idPro",
        as: "idProData",
      });
      Products.belongsTo(models.Brands, {
        foreignKey: "idBrand",
        targetKey: "id",
        as: "idBrandData",
      });
      Products.hasMany(models.Option_Product, {
        foreignKey: "idPro",
        as: "idProductsData",
      });
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      year: DataTypes.DATE,
      cpu: DataTypes.STRING,
      display: DataTypes.STRING,
      camera: DataTypes.STRING,
      battery: DataTypes.STRING,
      os: DataTypes.STRING,
      idBrand: DataTypes.INTEGER,
      idDiscount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
      freezeTableName: true,
    }
  );
  return Products;
};
