"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("myfrigoFoods", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
      },
      foodName: {
        type: Sequelize.STRING,
      },
      foodDate: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("myfrigoFoods");
  },
};
