const Post = {
  new(row) {
    return {
      infoType: row.informationType,
      text: row.headlineText,
      postNum: row.postNumber,
      display: true,
      reaction: new Set(),
      readMore: new Set(),
      shared: new Set(),
    };
  },
  addRow(post, row) {
    if (row.name === "REACTION") {
      post.reaction.add(row.value);
    } else if (row.name === "SHARE") {
      post.shared.add(row.value);
    } else if (row.name === "READ_MORE") {
      post.readMore.add(row.value);
    } else {
    }
  },
  sanitize(post) {
    const reactionSet = post.reaction;
    const reactionArray = Array.from(reactionSet);
    if (reactionSet.size > 1) post.reaction = "CORRUPTED";
    else post.reaction = reactionArray.length === 0 ? "" : reactionArray[0];

    const sharedSet = post.shared;
    const sharedArray = Array.from(sharedSet);
    if (sharedSet.size > 1) post.shared = "CORRUPTED";
    else post.shared = sharedArray.length === 0 ? "" : sharedArray[0];

    const readMoreSet = post.readMore;
    if (readMoreSet.size === 0) post.readMore = "";
    else post.readMore = "YES";
  },
};

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

module.exports = { sheetRowMaker, Post };
