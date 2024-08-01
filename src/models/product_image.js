"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Product_Image.belongsTo(models.Products, {
        foreignKey: "idPro",
        targetKey: "id",
        as: "idProData",
      });
      Product_Image.belongsTo(models.Color, {
        foreignKey: "idColor",
        targetKey: "id",
        as: "idColorData",
      });
    }
  }
  Product_Image.init(
    {
      image: DataTypes.STRING,
      filename: DataTypes.STRING,
      idPro: DataTypes.INTEGER,
      idColor: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Image",
      freezeTableName: true,
    }
  );
  return Product_Image;
};
