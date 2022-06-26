/**
 * All things related to the interaction between Study Manager and
 * Google Spreadsheet used for this project
 */

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { sleep } = require("./util");

async function* getRowsFromSpreadsheet(configDoc, sheetName) {
  const doc = new GoogleSpreadsheet(configDoc.id);
  let googleServiceAccountCredentials;
  if (
    process.env.NODE_ENV === undefined ||
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    googleServiceAccountCredentials = require("../credentials.json");
  } else {
    googleServiceAccountCredentials = JSON.parse(
      process.env.GOOGLE_CREDENTIALS
    );
  }

  await doc.useServiceAccountAuth(googleServiceAccountCredentials);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[configDoc.sheets[sheetName].index];
  const rows = await sheet.getRows();
  for (const row of rows) {
    yield row;
  }
}

/**
 * Google Spreadsheet imposes a write limit of 60 requests per minute
 * per user per project. This artificial delay of 1 seconds is to
 * avoid crossing that limit.
 */
async function saveInSheet(row, data) {
  if (data != undefined) {
    Object.keys(data).map((field) => {
      row[field] = data[field];
    });
    await row.save();
    await sleep(1000);
  }
}

module.exports = {
  getRowsFromSpreadsheet,
  saveInSheet,
};
