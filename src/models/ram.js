"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Ram.hasMany(models.Option_Product, { foreignKey: 'idRam', as: 'idRamData' })

    }
  }
  Ram.init(
    {
      nameRam: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ram",
      freezeTableName: true,
    }
  );
  return Ram;
};
