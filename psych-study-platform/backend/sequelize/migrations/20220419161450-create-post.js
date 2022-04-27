"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      informationType: {
        type: Sequelize.ENUM(
          "PLAUSIBLE",
          "IMPLAUSIBLE",
          "TRUE",
          "FALSE",
          "WHOLESOME"
        ),
      },
      headlineText: {
        type: Sequelize.STRING(255),
      },
      readMoreText: {
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
    await queryInterface.dropTable("Posts");
  },
};
