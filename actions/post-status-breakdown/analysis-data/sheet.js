const { getRowsFromSpreadsheet } = require("../core/service-sheet");
const { docs, study } = require("../config");

async function* usersFromSpreadSheet() {
  for await (const row of getRowsFromSpreadsheet(docs.dataAnalysis, "main")) {
    if (
      ["FINISHED", "THANK_YOU", "POST_TEST_SURVEY"].includes(row.current_status)
    ) {
      yield row;
    }
  }
  return;
}

module.exports = {
  usersFromSpreadSheet,
};
