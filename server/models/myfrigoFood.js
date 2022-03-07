"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class myfrigoFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.myfrigoFood.hasOne(models.user, {
        foreignKey: "id",
      });
    }
  }
  myfrigoFood.init(
    {
      userId: DataTypes.STRING,
      foodName: DataTypes.STRING,
      foodDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "myfrigoFood",
    },
  );
  return myfrigoFood;
};
