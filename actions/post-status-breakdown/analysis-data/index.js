const { connection } = require("../core/service-db");
const { writeFile } = require("fs/promises");
const { usersFromSpreadSheet } = require("./sheet");
const { getUserMetrics, getFeed } = require("./db");
const { sheetRowMaker } = require("./data");
const { saveInSheet, remove } = require("../core/service-sheet");
const { Post } = require("./model-post");

console.log("Analysis Data Script");

const targetSheetFields = {
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
    for (let i = 1; i < 51; i++) {
      yield* postFields.map((field) => field.replace("$", i));
    }
  },
};

const emptySheetRow = Object.assign(
  {},
  ...Array.from(targetSheetFields, (k, v) => ({ [k]: "" }))
);

// get user from sheet
// for that user get all post metrics
// for each item in that list
// postNumber, informationType,name, value,
/*

metrics : {
  1 :{
    informationType : '',
    name : '',
    value : ''
  }                       
}

then flatten this to the single row of google sheet
targetSheet.fields.map((field)=>{
  row[field] = sql(field)
})

eg row['email'] = 

*/

async function validatePostData(posts, sparse = true) {
  const errors = {};
  Object.keys(posts).map((postId) => {
    const post = posts[postId];
    errors[postId] = {};
    if (post.reaction.size > 1) {
      errors[postId]["reaction"] = [];
      errors[postId]["reaction"].push(Array.from(post.reaction));
    }
    if (post.readMore.size > 1) {
      errors[postId]["readMore"] = [];
      errors[postId]["readMore"].push(Array.from(post.readMore));
    }
    if (post.shared.size > 1) {
      errors[postId]["shared"] = [];
      errors[postId]["shared"].push(Array.from(post.shared));
    }
    if (sparse) {
      if (errors[postId].length === 0) {
        delete errors[postId];
      }
    }
  });

  return errors;
}

function addPost(newSheetRow, post) {
  const n = post.postNum;
  newSheetRow[`post${n}infotype`] = post.infoType;
  newSheetRow[`post${n}text`] = post.text;
  newSheetRow[`post${n}display`] = post.display;
  newSheetRow[`post${n}happy`] = post.reaction === "HAPPY" ? "YES" : "NO";
  newSheetRow[`post${n}disgust`] = post.reaction === "DISGUST" ? "YES" : "NO";
  newSheetRow[`post${n}anger`] = post.reaction === "ANGRY" ? "YES" : "NO";
  newSheetRow[`post${n}share`] = post.shared === "YES" ? "YES" : "NO";
  newSheetRow[`post${n}readmore`] = post.readMore === "YES" ? "YES" : "NO";
}

(async function test() {
  // console.log([...targetSheet.fields]);
  // const sqlRows = [1, 2, 3, 4, 5, 6];
  // get rows for a user from db

  let errors = {}; // for debugging. can be commented
  let allPosts = {}; // for debugging. can be commented

  const conn = await connection();

  for await (const user of usersFromSpreadSheet()) {
    const userId = user.user_id;
    console.log(`Validating : ${userId}`);

    const maker = sheetRowMaker();
    maker.next();

    for await (const row of getUserMetrics(conn, userId)) {
      maker.next(row);
    }

    const posts = (await maker.next(undefined)).value;
    for (let postId in posts) {
      Post.sanitize(posts[postId]);
    }

    const feed = await getFeed(conn, userId);
    for (const item of feed) {
      if (!posts[item.postId]) {
        posts[item.postId] = Post.empty(item);
      }
    }

    // create spreadsheet row
    const newSheetRow = emptySheetRow;
    for (let postId in posts) {
      // console.log(postId);
      addPost(newSheetRow, posts[postId]);
    }
    // save

    allPosts[userId] = newSheetRow; // for debugging. can be commented
    // allPosts[userId] = posts; // for debugging. can be commented

    remove(newSheetRow, ["email", "user_id", "current_status"]);
    await saveInSheet(user, newSheetRow);
  }
  // console.log(allPosts);
  // await writeFile("posts.json", JSON.stringify(allPosts)); // for debugging. can be commented
  // await writeFile("errors.json", JSON.stringify(errors)); // for debugging. can be commented

  process.exit();
})();

// (async function () {
//   console.log("test");
//   // console.log(emptySheetRow);
//   await writeFile(
//     "fields.json",
//     JSON.stringify({ fields: [...targetSheetFields] })
//   );
// })();
