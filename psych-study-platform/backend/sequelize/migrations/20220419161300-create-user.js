"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      username: {
        type: Sequelize.STRING(25),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
      },
      role: {
        type: Sequelize.ENUM("PARTICIPANT", "MANAGER"),
      },
      refreshToken: {
        type: Sequelize.STRING(500),
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
    await queryInterface.dropTable("Users");
  },
};
