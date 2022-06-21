const core = require("@actions/core");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);
const mysql = require("mysql2/promise");

const sleep = (time) =>
  new Promise((res) => setTimeout(res, time, "done sleeping"));

try {
  (async function () {
    console.log("Hello");
    const googleServiceAccountCredentials = JSON.parse(
      process.env.GOOGLE_CREDENTIALS
    );
    const sqlUsername = process.env.DB_USERNAME;
    const sqlPassword = process.env.DB_PASSWORD;
    console.log({
      projectId: googleServiceAccountCredentials.project_id,
      sqlUsername,
      sqlPassword,
    });

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "psych_study_platform_production",
    });

    const [rows, fields] = await connection.execute(`
      SELECT Count(Users.username), StudyPhases.stage 
      FROM StudyPhases
      LEFT JOIN Users
      ON Users.id = StudyPhases.user
      WHERE StudyPhases.current =TRUE 
      GROUP BY StudyPhases.stage
    `);

    console.log(rows);

    // await doc.useServiceAccountAuth(googleServiceAccountCredentials);
    // await doc.loadInfo();
    // const sheet = doc.sheetsByIndex[3];
    // const sheetRows = await sheet.getRows();

    // for (var i = 0; i < sheetRows.length; i++) {
    //   try {
    //     // console.log({ username: rows[i].username, password: rows[i].password });
    //   } catch (err) {
    //     console.log(`Error Saving row ${i}`);
    //     console.log(err);
    //   }
    // }
  })();
} catch (err) {
  core.setFailed(err.message);
}
