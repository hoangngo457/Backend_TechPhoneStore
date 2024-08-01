"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rom.hasMany(models.Option_Product, {
        foreignKey: "idRom",
        as: "idRomData",
      });
    }
  }
  Rom.init(
    {
      nameRom: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rom",
      freezeTableName: true,
    }
  );
  return Rom;
};
