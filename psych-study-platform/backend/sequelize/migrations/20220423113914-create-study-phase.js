"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StudyPhases", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      stage: {
        type: Sequelize.ENUM(
          "UNUSED",
          "ONBOARDING",
          "TEST_DAY_01",
          "TEST_DAY_02",
          "TEST_DAY_03",
          "POST_TEST_SURVEY",
          "FINISHED"
        ),
        defaultValue: "UNUSED",
        allowNull: false,
      },
      finishedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("StudyPhases");
  },
};
