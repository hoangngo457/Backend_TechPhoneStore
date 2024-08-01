"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Address, { foreignKey: "idUser", as: "idUserData" });
      User.hasMany(models.FeedBack, {
        foreignKey: "idUser",
        as: "idUsersFeedBackData",
      });

      User.hasMany(models.Cart, {
        foreignKey: "idUser",
        as: "idUsersCartData",
      });
      User.hasMany(models.Favorites, {
        foreignKey: "idUser",
        as: "idUsersFavoriteData",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      filename: DataTypes.STRING, // dùng để lưu  tên ảnh để update, delete
      roleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
      freezeTableName: true,
    }
  );
  return User;
};
