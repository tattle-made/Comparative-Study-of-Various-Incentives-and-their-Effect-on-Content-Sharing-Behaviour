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
  empty(row) {
    return {
      infoType: row.informationType,
      text: row.headlineText,
      postNum: row.postNumber,
      display: true,
      reaction: "",
      readMore: "",
      shared: "",
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
  /**
   * 1. If multiple distinct values are recorded, it is marked as CORRUPTED
   * 2. If multiple same values are recorded, it is collapsed into one
   */
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

module.exports = { Post };
