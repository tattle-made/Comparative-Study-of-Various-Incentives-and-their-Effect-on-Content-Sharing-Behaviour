"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyPhase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudyPhase.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      stage: DataTypes.ENUM(
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
    {
      sequelize,
      modelName: "StudyPhase",
    }
  );
  return StudyPhase;
};
