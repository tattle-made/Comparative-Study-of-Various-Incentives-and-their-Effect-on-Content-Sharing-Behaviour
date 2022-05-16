/**
 * Get data stored at https://docs.google.com/spreadsheets/d/1Twjb1bMGMGG-iwUNYb6QTmRr2ifSL-KUR6Z1llQuC44/edit#gid=0
 * and transforms it into a template that can be provided to the seeder script at
 *
 * run `node scripts/get-data-from-sheet.js`
 * look for output at data.json. Remember to delete it after use or before running the script again
 */
const creds = require("./credentials.json"); // the file saved above
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1Twjb1bMGMGG-iwUNYb6QTmRr2ifSL-KUR6Z1llQuC44"
);
const fs = require("fs").promises;

async function parseSheet(sheet) {
  const totalRows = sheet.rowCount;
  await sheet.loadCells(`A1:G${totalRows}`);

  let data = {};
  for (var i = 0; i < totalRows; i++) {
    const cell = sheet.getCell(i, 0).value;
    if (typeof cell === "number") {
      //   console.log(cell);
      data[cell] = {};
      data[cell]["label"] = sheet.getCell(i, 1).value;
      data[cell]["plausible"] = sheet.getCell(i, 2).value;
      data[cell]["plausibleReadMore"] = sheet.getCell(i + 1, 2).value;
      data[cell]["implausible"] = sheet.getCell(i, 3).value;
      data[cell]["implausibleReadMore"] = sheet.getCell(i + 1, 3).value;
      data[cell]["true"] = sheet.getCell(i, 4).value;
      data[cell]["trueReadMore"] = sheet.getCell(i + 1, 4).value;
      data[cell]["false"] = sheet.getCell(i, 5).value;
      data[cell]["falseReadMore"] = sheet.getCell(i + 1, 5).value;
      data[cell]["wholesome"] = sheet.getCell(i, 6).value;
      data[cell]["wholesomeReadMore"] = sheet.getCell(i + 1, 6).value;
    }
  }
  return data;
}

function transformData(data) {
  var posts = [];
  Object.keys(data).map((key, ix) => {
    posts.push({
      postNumber: ix,
      informationType: "PLAUSIBLE",
      headlineText: data[key]["plausible"],
      readMoreText: data[key]["plausibleReadMore"],
    });
    posts.push({
      postNumber: ix,
      informationType: "IMPLAUSIBLE",
      headlineText: data[key]["implausible"],
      readMoreText: data[key]["implausibleReadMore"],
    });
    posts.push({
      postNumber: ix,
      informationType: "TRUE",
      headlineText: data[key]["true"],
      readMoreText: data[key]["trueReadMore"],
    });
    posts.push({
      postNumber: ix,
      informationType: "FALSE",
      headlineText: data[key]["false"],
      readMoreText: data[key]["falseReadMore"],
    });
    posts.push({
      postNumber: ix,
      informationType: "WHOLESOME",
      headlineText: data[key]["wholesome"],
      readMoreText: data[key]["wholesomeReadMore"],
    });
  });
  return posts;
}

(async function getDataFromSheet() {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const data = await parseSheet(sheet);
  await fs.writeFile("scripts/data.json", JSON.stringify(data));

  const transformedData = transformData(data);
  await fs.writeFile("scripts/posts.json", JSON.stringify(transformedData));
})();
