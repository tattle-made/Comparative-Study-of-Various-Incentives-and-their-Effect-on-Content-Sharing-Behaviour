const creds = require("./credentials.json"); // the file saved above
const { GoogleSpreadsheet } = require("google-spreadsheet");
const {
  sendOnboardingEmail,
  sendPostDayOneReminder,
  sendPostDayTwoReminder,
} = require("./email");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);
const { StudyPhase } = require("../sequelize/models");

const sleep = (time) =>
  new Promise((res) => setTimeout(res, time, "done sleeping"));

(async function updateUserCurrentStatus() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[3];
  const rows = await sheet.getRows();

  try {
    for (var i = 0; i < rows.length; i++) {
      try {
        const userId = rows[i].user_id;
        const studyPhase = await StudyPhase.findOne({
          where: {
            user: userId,
            current: true,
          },
        });
        if (studyPhase === null || studyPhase === undefined) {
          //	console.log('User has not logged in')
        } else {
          console.log({ userId, stage: studyPhase.stage });
          rows[i].current_status = studyPhase.stage;
          rows[i].current_status_ts = new Date().toUTCString();
          await rows[i].save();
          await sleep(150);
        }
      } catch (err) {
        console.log(`Error Updating row ${i}`);
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
