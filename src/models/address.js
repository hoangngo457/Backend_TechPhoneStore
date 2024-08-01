"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.hasMany(models.Orders, { foreignKey: 'idAdr', as: 'idAddressData' })
      Address.belongsTo(models.Users, { foreignKey: 'idUser', targetKey: 'id', as: 'idUserData' })


    }
  }
  Address.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      ward: DataTypes.STRING,
      phone_num: DataTypes.STRING,
      detail_Adr: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Address",
      freezeTableName: true,
    }
  );
  return Address;
};
