const { User, StudyPhase } = require("../../sequelize/models");
const { checkAndUpdate } = require("./controller");

const USER_ID = "00b61de3-29e4-457a-80b2-19ae66e1c7fd";

describe("Study Phase Functions", () => {
  test("new users should not have a study phase", async () => {
    const studyPhase = await StudyPhase.findAll({
      where: {
        user: USER_ID,
      },
    });
    expect(studyPhase.length).toBe(0);
  });

  test("initialize study phase for new user", async () => {
    // const USER_ID = "00b61de3-29e4-457a-80b2-19ae66e1c7fd";
    await checkAndUpdate(USER_ID);
    const studyPhase = await StudyPhase.findAll({
      where: {
        user: USER_ID,
      },
    });
    expect(studyPhase[0].stage).toBe("PRETEST");
  });
});
