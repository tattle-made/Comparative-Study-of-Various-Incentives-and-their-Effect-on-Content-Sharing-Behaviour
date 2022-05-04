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
        "ONBOARDING",
        "TEST_DAY_01",
        "TEST_DAY_02",
        "TEST_DAY_03",
        "POST_TEST_SURVEY",
        "FINISHED"
      ),
      user: {
        type: DataTypes.STRING,
      },
      finishedAt: {
        type: DataTypes.DATE,
      },
      current: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "StudyPhase",
    }
  );

  StudyPhase.getCurrentStage = async (userId) => {
    const studyPhase = await StudyPhase.findOne({
      where: {
        user: userId,
        current: true,
      },
    });
    return studyPhase;
  };

  return StudyPhase;
};
