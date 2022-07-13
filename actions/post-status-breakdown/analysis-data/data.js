const { Post } = require("./model-post");

/**
 * 
 * A generator that receives rows of data from a sql database
 * and consolidates it into a structured json.
 * Received rows represent unique Post events - shared, readMore, 
 * reactions etc. The generated json groups all these events
 * by their postId
 * 
┌─────────────────────────────────────────────────────────┐
│ userId         | postId          | name      | value    │
├─────────────────────────────────────────────────────────┤
│ adfd-asdf-adf  | 123-123-123     | SHARE     | YES      │
│ adfd-asdf-adf  | 123-123-123     | READ_MORE | YES      │
│ adfd-asdf-adf  | 123-123-123     | REACTION  | ANGRY    │
│ adfd-asdf-adf  | 123-123-124     | SHARE     | YES      │
│ adfd-asdf-adf  | 123-123-124     | REACTION  | DISGUST  │
└─────────────────────────┬───────────────────────────────┘
                          │
                          │
                          │
              ┌───────────▼─────────────┐
              │                         │
              │   123-123-123 : {       │
              │     shared : yes        │
              │     readMore : yes      │
              │     reaction: angry     │
              │   },                    │
              │   123-123-124 : {       │
              │     shared : yes,       │
              │     reaction: disgust   │
              │   }                     │
              │                         │
              └─────────────────────────┘
 * 
 */
async function* sheetRowMaker() {
  let posts = {};

  let row = yield;
  while (row) {
    if (posts[row.postId] === undefined) {
      posts[row.postId] = Post.new(row);
    }
    Post.addRow(posts[row.postId], row);
    row = yield;
  }
  yield posts;
}

module.exports = { sheetRowMaker };
