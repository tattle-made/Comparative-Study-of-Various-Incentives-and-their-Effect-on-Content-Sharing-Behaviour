"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PostMetrics", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      post: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Posts", key: "id" },
      },
      name: {
        type: Sequelize.STRING,
      },
      value: {
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
    await queryInterface.dropTable("PostMetrics");
  },
};
