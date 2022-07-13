const { getRowsFromSpreadsheet } = require("../core/service-sheet");
const { docs, study } = require("../config");

async function* usersFromSpreadSheet() {
  for await (const row of getRowsFromSpreadsheet(docs.dataAnalysis, "main")) {
    yield row;
  }
  return;
}

module.exports = {
  usersFromSpreadSheet,
};
