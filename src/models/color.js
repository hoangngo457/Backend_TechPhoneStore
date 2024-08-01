"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Color.hasMany(models.Product_Image, { foreignKey: 'idColor', as: 'idColorData' })
      Color.hasMany(models.Option_Product, { foreignKey: 'idColor', as: 'idColorOptData' })

    }
  }
  Color.init(
    {
      nameColor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Color",
      freezeTableName: true,
    }
  );
  return Color;
};
