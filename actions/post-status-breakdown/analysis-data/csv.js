const jsonexport = require("jsonexport");
const { writeFile } = require("fs").promises;
const { postNumberInSheet } = require("./adapter");

const targetFields = {
  [Symbol.iterator]: function* () {
    // const staticFields = ["userId", "email", "type", "status", "points"];
    const staticFields = ["type", "points"];

    // $ sign here is just a distinct placeholder that
    // gets replaced later on with numbers via replace function.
    // this could have been any other character like @,% etc
    const postFields = [
      `post$infotype`,
      `post$text`,
      `post$display`,
      `post$happy`,
      `post$disgust`,
      `post$anger`,
      `post$share`,
      `post$readmore`,
    ];

    for (const field of staticFields) yield field;
    for (let i = 1; i < 251; i++) {
      yield* postFields.map((field) => field.replace("$", i));
    }
  },
};

const emptySheetRow = () => {
  return Object.assign(
    {},
    ...Array.from(targetFields, (k, v) => ({ [k]: "UNFILLED" }))
  );
};

function addPost(newSheetRow, post) {
  const n = postNumberInSheet(post.postNum, post.infoType);
  newSheetRow[`post${n}infotype`] = post.infoType;
  newSheetRow[`post${n}text`] = post.text;
  newSheetRow[`post${n}display`] = post.display;
  newSheetRow[`post${n}happy`] = post.reaction === "HAPPY" ? "YES" : "NO";
  newSheetRow[`post${n}disgust`] = post.reaction === "DISGUST" ? "YES" : "NO";
  newSheetRow[`post${n}anger`] = post.reaction === "ANGRY" ? "YES" : "NO";
  newSheetRow[`post${n}share`] = post.shared === "YES" ? "YES" : "NO";
  newSheetRow[`post${n}readmore`] = post.readMore === "YES" ? "YES" : "NO";
}

async function jsonToCSV(data) {
  return new Promise((resolve, reject) => {
    jsonexport(data, { rowDelimiter: "," }, async function (err, csv) {
      if (err) {
        reject(err);
      }
      // console.log(csv);
      await writeFile(`user-study-data-${new Date().toISOString()}.csv`, csv);
      resolve(csv);
    });
  });
}

module.exports = {
  emptySheetRow,
  jsonToCSV,
  addPost,
};
