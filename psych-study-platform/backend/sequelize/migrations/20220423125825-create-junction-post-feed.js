"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JunctionPostFeeds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.UUID,
      },
      postId: {
        type: Sequelize.UUID,
      },
      feedId: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable("JunctionPostFeeds");
  },
};
