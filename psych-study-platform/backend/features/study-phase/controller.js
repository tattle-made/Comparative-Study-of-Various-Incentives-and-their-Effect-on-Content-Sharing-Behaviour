const { User, StudyPhase } = require("../../sequelize/models");
const { UnableToCreateNewStudyPhase } = require("./error");

async function checkAndUpdate(userId) {
  const studyPhase = await StudyPhase.findAll({
    where: {
      user: userId,
    },
    order: [["createdAt", "DESC"]],
  });

  if (studyPhase.length === 0) {
    // this user has never logged in
    try {
      await StudyPhase.create({
        user: userId,
        stage: "ONBOARDING",
        startedAt: new Date(),
        finishedAt: null,
      });
    } catch (err) {
      console.log(err);
      throw new UnableToCreateNewStudyPhase(
        `Cound not create onboarding study phase for ${userId}`
      );
    }
  }
}

module.exports = {
  checkAndUpdate,
};
