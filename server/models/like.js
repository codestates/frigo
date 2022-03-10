"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.like.hasOne(models.user, {
        foreignKey: "id",
      });
      models.like.hasOne(models.post, {
        foreignKey: "id",
      });
    }
  }
  like.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      ddabong: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "like",
    },
  );
  return like;
};
