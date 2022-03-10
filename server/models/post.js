"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.hasOne(models.user, {
        foreignKey: "id",
      });
      models.post.hasMany(models.comment, {
        foreignKey: "postId",
      });
      models.post.hasMany(models.like, {
        foreignKey: "userId",
      });
    }
  }
  post.init(
    {
      userId: DataTypes.INTEGER,
      tag: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      ddCnt: DataTypes.INTEGER,
      ddabong: DataTypes.STRING,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post",
    },
  );
  return post;
};
