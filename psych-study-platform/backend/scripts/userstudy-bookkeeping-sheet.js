/**
 * Get data stored at https://docs.google.com/spreadsheets/d/14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y/edit#gid=649120577
 * and use it for automated book keeping related to the user study
 *
 *
 */
const creds = require("./credentials.json"); // the file saved above
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { sendOnboardingEmail, sendPostDayOneReminder } = require("./email");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);
const fs = require("fs").promises;

async function parseSheet(sheet) {
  const totalRows = sheet.rowCount;
  await sheet.loadCells(`A1:L${totalRows}`);

  let data = [];
  for (var i = 1; i < totalRows; i++) {
    const cell = sheet.getCell(i, 0).value;
    if (cell != null) {
      //   console.log(cell);
      const username = sheet.getCell(i, 2).value;
      const password = sheet.getCell(i, 3).value;
      data.push({ email: cell, username, password });
    }
  }
  return data;
}

(async function getDataFromSheet() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[3];
  const data = await parseSheet(sheet);
  // console.log(data);

  let i = 1;
  for (let user of data) {
    await sendPostDayOneReminder(user);
    const status = sheet.getCell(i, 6);
    const timestamp = sheet.getCell(i, 7);
    status.value = "SENT_AUTOMATED";
    timestamp.value = new Date().toUTCString();
    console.log(`Emailed ${user.email}`);
    i++;
  }
  await sheet.saveUpdatedCells();
  //   await fs.writeFile("scripts/data.json", JSON.stringify(data));
})();
