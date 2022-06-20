/**
 * Get data stored at https://docs.google.com/spreadsheets/d/14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y/edit#gid=649120577
 * and use it for automated book keeping related to the user study
 *
 *
 */
const creds = require("./credentials.json"); // the file saved above
const { GoogleSpreadsheet } = require("google-spreadsheet");
const {
  sendOnboardingEmail,
  sendPostDayOneReminder,
  sendPostDayTwoReminder,
  sendReminderEmailToNonLoggedInUsers,
} = require("./email");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);
const { StudyPhase } = require("../sequelize/models");

const sleep = (time) =>
  new Promise((res) => setTimeout(res, time, "done sleeping"));

(async function getDataFromSheet() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[3];
  const rows = await sheet.getRows();

  try {
    for (var i = 0; i < rows.length; i++) {
      try {
        if (rows[i].session_number === "3") {
          const email = rows[i].email;
          const username = rows[i].username;
          const password = rows[i].password;
          const post_day_1_reminder_email = rows[i].post_day_1_reminder_email;
          const post_day_1_reminder_email_ts =
            rows[i].post_day_1_reminder_email_ts;

          if (
            (post_day_1_reminder_email === undefined ||
              post_day_1_reminder_email === "") &&
            (post_day_1_reminder_email_ts === undefined ||
              post_day_1_reminder_email_ts === "")
          ) {
            console.log("found contender for emailing", { email });
            rows[i].post_day_1_reminder_email = "SENT";
            rows[i].post_day_1_reminder_email_ts = new Date().toUTCString();
            console.log({ email, username, password });
            await sendPostDayOneReminder({
              email,
              username,
              password,
            });
            await rows[i].save();
            await sleep(1000);
          } else {
            console.log("found unexpected state");
          }
        }
      } catch (err) {
        console.log(`Error Saving row ${i}`);
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
