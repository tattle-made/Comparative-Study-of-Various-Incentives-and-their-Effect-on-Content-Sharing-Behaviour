const { User, StudyPhase } = require("../../sequelize/models");
const { checkAndUpdate } = require("./controller");

const USER_ID = "00319b75-eb27-4895-b52a-5526748408aa";

describe("Study Phase Functions", () => {
  test("new users should not have a study phase", async () => {
    const studyPhase = await StudyPhase.findAll({
      where: {
        user: USER_ID,
      },
    });
    expect(studyPhase.length).toBe(0);
  });

  test("study phase progression", async () => {
    await checkAndUpdate(USER_ID);
    const studyPhase = await StudyPhase.getCurrentStage(USER_ID);
    expect(studyPhase.stage).toBe("FINISHED");
  });
});
