const core = require("@actions/core");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "18IHzjvGxLG8D6ZOiW1gOjsJUfxPYSM0HJUVa02dZWCs"
);
const mysql = require("mysql2/promise");

const sleep = (time) =>
  new Promise((res) => setTimeout(res, time, "done sleeping"));

const SHEET_INDEX_BY_NAME = {
  "Aggregate User Status": 0,
  "Individual User Status": 1,
};

try {
  (async function () {
    console.log("Hello");
    const googleServiceAccountCredentials = JSON.parse(
      process.env.GOOGLE_CREDENTIALS
    );

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "psych_study_platform_production",
    });

    const [rows, fields] = await connection.execute(`
      SELECT Count(Users.username) as count, StudyPhases.stage
      FROM StudyPhases
      LEFT JOIN Users
      ON Users.id = StudyPhases.user
      WHERE StudyPhases.current =TRUE
      GROUP BY StudyPhases.stage
    `);

    await doc.useServiceAccountAuth(googleServiceAccountCredentials);
    await doc.loadInfo();
    const sheet =
      doc.sheetsByIndex[SHEET_INDEX_BY_NAME["Aggregate User Status"]];
    await sheet.loadCells("A3:B11");

    for (let i = 0; i < rows.length; i++) {
      const cellCount = sheet.getCellByA1(`A${3 + i}`);
      const cellStage = sheet.getCellByA1(`B${3 + i}`);
      cellCount.value = rows[i].count;
      cellStage.value = rows[i].stage;
    }

    await sheet.saveUpdatedCells();
  })();
} catch (err) {
  core.setFailed(err.message);
}
