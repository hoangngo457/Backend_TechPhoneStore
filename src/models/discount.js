"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discount.init(
    {
      code: DataTypes.STRING,
      discount_amount: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      idOpt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Discount",
      // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
      freezeTableName: true,
    }
  );
  return Discount;
};
