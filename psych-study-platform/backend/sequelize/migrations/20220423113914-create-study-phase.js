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
          "PRETEST",
          "ONBOARDING",
          "TEST_DAY_01",
          "TEST_DAY_02",
          "TEST_DAY_03",
          "TEST_DAY_04",
          "TEST_DAY_05",
          "POST_TEST_SURVEY",
          "CRISIS",
          "BLOCKED"
        ),
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
