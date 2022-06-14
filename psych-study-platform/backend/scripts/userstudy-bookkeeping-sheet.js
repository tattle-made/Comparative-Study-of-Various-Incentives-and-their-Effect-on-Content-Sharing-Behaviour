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
} = require("./email");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);

const sleep = (time) =>
  new Promise((res) => setTimeout(res, time, "done sleeping"));

(async function getDataFromSheet() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[4];
  const rows = await sheet.getRows();

  try {
    for (var i = 0; i < rows.length; i++) {
      try {
        if (rows[i].session_number == 2) {
          const email = rows[i].email;
          const username = rows[i].username;
          const password = rows[i].password;

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
