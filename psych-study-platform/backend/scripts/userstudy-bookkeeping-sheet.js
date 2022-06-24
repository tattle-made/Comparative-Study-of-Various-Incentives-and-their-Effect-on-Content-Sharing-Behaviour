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
    for (const row of rows) {
      try {
        if (row.session_number === "4") {
          const email = row.email;
          const username = row.username;
          const password = row.password;

          row.onboarding_email = "SENT";
          row.onboarding_email_ts = new Date().toUTCString();
          console.log({ email, username, password });
          try {
            await sendOnboardingEmail({
              email,
              username,
              password,
            });
            await row.save();
            await sleep(150);
          } catch (err) {
            console.log("error sending email");
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
