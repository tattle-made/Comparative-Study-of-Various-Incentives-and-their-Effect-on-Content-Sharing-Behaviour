const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);
const mysql = require("mysql2/promise");
const { config } = require("./config");
const { userFactory } = require("./factory-user");
const { sleep } = require("./util");

const SHEET_INDEX_BY_NAME = {
  "Production Server Data": 8,
};

exports.updateUserStatusOnGoogleSheet = async () => {
  console.log("Updating User Status on Google Sheet");

  try {
    const googleServiceAccountCredentials = JSON.parse(
      process.env.GOOGLE_CREDENTIALS
    );
    await doc.useServiceAccountAuth(googleServiceAccountCredentials);
    await doc.loadInfo();
    const sheet =
      doc.sheetsByIndex[SHEET_INDEX_BY_NAME["Production Server Data"]];
    const sheetRows = await sheet.getRows();

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "psych_study_platform_production",
    });

    for (const sheetRow of sheetRows) {
      try {
        const user = userFactory(sheetRow);
        if (isNaN(user.session)) {
          continue;
        }
        if (user.session <= config.MAX_SESSION) {
          console.log(`Updating status for row ${sheetRow.rowNumber}`);
          const [rows, fields] = await connection.execute(
            `SELECT * FROM StudyPhases WHERE user = "${user.userId}" AND current = true`
          );

          if (rows != undefined && rows.length == 1) {
            const row = rows[0];
            sheetRow.current_status = row.stage;
            sheetRow.current_status_ts = new Date().toUTCString();
            await sheetRow.save();
            await sleep(1000);
          }
        }
      } catch (err) {
        console.log(`Error Updating Status for ${sheetRow.rowNumber}`);
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
    core.setFailed(err.message);
  }
};
