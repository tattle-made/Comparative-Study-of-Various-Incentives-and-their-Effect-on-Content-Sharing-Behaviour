/**
 * Get data stored at https://docs.google.com/spreadsheets/d/14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y/edit#gid=649120577
 * and use it for automated book keeping related to the user study
 *
 *
 */
const creds = require("./credentials.json"); // the file saved above
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);
const passwordMapProduction = require("../sequelize/seeders/passwordMapProduction.json");

const sleep = (time) =>
  new Promise((res) => setTimeout(res, time, "done sleeping"));

(async function getDataFromSheet() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[5];
  const rows = await sheet.getRows();

  try {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].session_number != 1) {
        rows[i].user_id = passwordMapProduction[i - 25].id;
        rows[i].username = passwordMapProduction[i - 25].username;
        rows[i].password = passwordMapProduction[i - 25].password;
        await rows[i].save();
        await sleep(1000);
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
