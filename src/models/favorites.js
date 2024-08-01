"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorites.belongsTo(models.Users, {
        foreignKey: "idUser",
        targetKey: "id",
        as: "idUsersFavoriteData",
      });

      Favorites.belongsTo(models.Option_Product, {
        foreignKey: "idOpt",
        targetKey: "id",
        as: "idOptionFavoriteData",
      });
    }
  }
  Favorites.init(
    {
      idUser: DataTypes.INTEGER,
      idOpt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorites",
      freezeTableName: true,
    }
  );
  return Favorites;
};
