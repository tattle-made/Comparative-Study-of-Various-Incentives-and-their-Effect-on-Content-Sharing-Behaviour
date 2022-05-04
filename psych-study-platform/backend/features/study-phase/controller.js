const { User, StudyPhase, sequelize } = require("../../sequelize/models");
const {
  UnableToCreateNewStudyPhase,
  UnableToUpdateStudyPhase,
  UnableToGoToNextPhaseError,
} = require("./error");

async function goToNextPhase(userId, studyPhase, newStageName) {
  return sequelize.transaction(async (t) => {
    await StudyPhase.update(
      {
        finishedAt: new Date(),
        current: false,
      },
      {
        where: {
          id: studyPhase.id,
        },
      },
      { transaction: t }
    );
    await StudyPhase.create(
      {
        user: userId,
        stage: newStageName,
        current: true,
        finishedAt: null,
      },
      { transaction: t }
    );
  });
}

/**
 *
 * date subtraction logic : https://stackoverflow.com/a/19225540
 */
async function checkAndUpdate(userId) {
  const studyPhase = await StudyPhase.getCurrentStage(userId);

  if (studyPhase === null) {
    // this user has never logged in
    try {
      await StudyPhase.create({
        user: userId,
        stage: "ONBOARDING",
        finishedAt: null,
        current: true,
      });
    } catch (err) {
      console.log(err);
      throw new UnableToCreateNewStudyPhase(
        `Cound not create onboarding study phase for ${userId}`
      );
    }
  } else {
    if (studyPhase.stage === "ONBOARDING") {
      try {
        await goToNextPhase(userId, studyPhase, "TEST_DAY_01");
      } catch (err) {
        console.log(err);
        throw new UnableToGoToNextPhaseError(
          `Cound not create Test Day 01 study phase for ${userId}`
        );
      }
    } else if (studyPhase.stage === "TEST_DAY_01") {
      const now = new Date();
      const timeElapsed = Math.abs(now - studyPhase.createdAt) / 60000;
      if (timeElapsed > 1) {
        try {
          await goToNextPhase(userId, studyPhase, "TEST_DAY_02");
        } catch (err) {
          console.log(err);
          throw new UnableToGoToNextPhaseError(
            `Cound not create Test Day 02 study phase for ${userId}`
          );
        }
      } else {
        throw new UnableToUpdateStudyPhase(
          `Required Threshold not passed to go to next phase`
        );
      }
    } else if (studyPhase.stage === "TEST_DAY_02") {
      const now = new Date();
      const timeElapsed = Math.abs(now - studyPhase.createdAt) / 60000;
      if (timeElapsed > 1) {
        try {
          await goToNextPhase(userId, studyPhase, "TEST_DAY_03");
        } catch (err) {
          console.log(err);
          throw new UnableToGoToNextPhaseError(
            `Cound not create Test Day 03 study phase for ${userId}`
          );
        }
      } else {
        throw new UnableToUpdateStudyPhase(
          `Required Threshold not passed to go to next phase`
        );
      }
    } else if (studyPhase.stage === "TEST_DAY_03") {
      await goToNextPhase(userId, studyPhase, "POST_TEST_SURVEY");
    } else if (studyPhase.stage === "POST_TEST_SURVEY") {
      await goToNextPhase(userId, studyPhase, "FINISHED");
    } else if (studyPhase.stage === "FINISHED") {
      throw new UnableToCreateNewStudyPhase(`Can not go beyond FINISHED`);
    } else {
      throw new UnableToCreateNewStudyPhase(
        `Unexpected value of stage ${stage}`
      );
    }
  }
}

module.exports = {
  checkAndUpdate,
};
