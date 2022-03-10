"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.hasOne(models.post, {
        foreignKey: "id",
      });
      models.comment.hasOne(models.user, {
        foreignKey: "id",
      });
    }
  }
  comment.init(
    {
      username: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comment",
    },
  );
  return comment;
};
