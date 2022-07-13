const { connection } = require("../core/service-db");
const { usersFromSpreadSheet } = require("./sheet");
const { getUserMetrics, getFeed, getUsersFinished } = require("./db");
const { sheetRowMaker } = require("./data");
const { saveInSheet } = require("../core/service-sheet");
const { Post } = require("./model-post");
const { emptySheetRow, jsonToCSV, addPost } = require("./csv");

console.log("Analysis Data Script");

/**
 * you might have to run npm install jsonexport
 */
(async function main() {
  let errors = {}; // for debugging. can be commented
  let allPosts = []; // for debugging. can be commented

  /**
   * user email ids are only stored on a google spreadsheet.
   * this function construcuts a Map of user id and their emails.
   */
  const users = {};
  for await (const user of usersFromSpreadSheet()) {
    users[user.user_id] = {
      userId: user.user_id,
      email: user.email,
    };
  }

  const conn = await connection(); // connection to the sql database

  for await (const user of getUsersFinished(conn)) {
    const { userId } = user;
    console.log(`Validating : ${userId}`);

    let csvDataUser = {
      id: userId,
      email: users[userId].email,
      type: user.type,
      points: user.points,
      stage: user.stage,
    };

    const maker = sheetRowMaker();
    maker.next();
    for await (const row of getUserMetrics(conn, userId)) {
      maker.next(row);
    }

    const csvDataPosts = (await maker.next(undefined)).value; // fields related to user study - postNDisplay, postNText etc
    for (let postId in csvDataPosts) {
      Post.sanitize(csvDataPosts[postId]);
    }

    const feed = await getFeed(conn, userId);
    for (const item of feed) {
      if (!csvDataPosts[item.postId]) {
        csvDataPosts[item.postId] = Post.empty(item);
      }
    }

    // create csv row
    // add user study related fields
    const newSheetRow = emptySheetRow();
    for (let postId in csvDataPosts) {
      addPost(newSheetRow, csvDataPosts[postId]);
    }
    // add user's fields
    Object.keys(csvDataUser).map((key) => {
      newSheetRow[key] = csvDataUser[key];
    });

    allPosts.push(newSheetRow);
  }
  await jsonToCSV(allPosts);
  process.exit();
})();
