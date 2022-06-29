const { getRowsFromSpreadsheet } = require("../core/service-sheet");
const { docs, study } = require("../config");

async function* usersFromSpreadSheet() {
  let i = 0;
  for await (const row of getRowsFromSpreadsheet(docs.dataAnalysis, "main")) {
    if (i < 100) {
      if (
        ["FINISHED", "THANK_YOU", "POST_TEST_SURVEY"].includes(
          row.current_status
        )
      ) {
        yield row;
      }
    } else {
      return;
    }
    i++;
  }
  return;
}

module.exports = {
  usersFromSpreadSheet,
};
