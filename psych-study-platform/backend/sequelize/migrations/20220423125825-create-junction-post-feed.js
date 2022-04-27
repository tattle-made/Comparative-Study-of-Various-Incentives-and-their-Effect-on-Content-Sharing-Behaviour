"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JunctionPostFeeds", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      postId: {
        type: Sequelize.UUID,
        references: { model: "Posts", key: "id" },
      },
      feedId: {
        type: Sequelize.UUID,
        references: { model: "Feeds", key: "id" },
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
