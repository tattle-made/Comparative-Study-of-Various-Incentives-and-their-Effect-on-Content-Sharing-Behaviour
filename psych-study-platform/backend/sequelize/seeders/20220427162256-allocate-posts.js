"use strict";
const { v4: uuidv4 } = require("uuid");

const timeOfRun = new Date();

function getPostDistribution(posts) {
  let postIDs = new Set();

  while (postIDs.size < 25) {
    postIDs.add(Math.floor(Math.random() * 50));
  }
  postIDs = Array.from(postIDs);

  let truePosts = new Set();
  let plausiblePosts = new Set();
  let falsePosts = new Set();
  let implausiblePosts = new Set();
  let wholesomePosts = new Set();

  postIDs.map((postId, ix) => {
    if (ix >= 0 && ix < 5) {
      // PLAUSIBLE
      plausiblePosts.add(posts[postId * 5 + 0]);
    } else if (ix >= 5 && ix < 10) {
      // IMPLAUSIBLE
      implausiblePosts.add(posts[postId * 5 + 1]);
    } else if (ix >= 10 && ix < 15) {
      // TRUE
      truePosts.add(posts[postId * 5 + 2]);
    } else if (ix >= 15 && ix < 20) {
      // FALSE
      falsePosts.add(posts[postId * 5 + 3]);
    } else if (ix >= 20 && ix < 25) {
      // WHOLESOME
      wholesomePosts.add(posts[postId * 5 + 4]);
    } else {
      console.log("error");
    }
  });

  let dayOnePosts = [];
  let remainingPosts = [];

  let plausiblePostIterator = plausiblePosts.values();
  dayOnePosts.push(plausiblePostIterator.next().value);
  let post = plausiblePostIterator.next();
  while (!post.done) {
    remainingPosts.push(post.value);
    post = plausiblePostIterator.next();
  }

  let implausiblePostIterator = implausiblePosts.values();
  dayOnePosts.push(implausiblePostIterator.next().value);
  post = implausiblePostIterator.next();
  while (!post.done) {
    remainingPosts.push(post.value);
    post = implausiblePostIterator.next();
  }

  let truePostIterator = truePosts.values();
  dayOnePosts.push(truePostIterator.next().value);
  post = truePostIterator.next();
  while (!post.done) {
    remainingPosts.push(post.value);
    post = truePostIterator.next();
  }

  let falsePostIterator = falsePosts.values();
  dayOnePosts.push(falsePostIterator.next().value);
  post = falsePostIterator.next();
  while (!post.done) {
    remainingPosts.push(post.value);
    post = falsePostIterator.next();
  }

  let wholesomePostIterator = wholesomePosts.values();
  dayOnePosts.push(wholesomePostIterator.next().value);
  post = wholesomePostIterator.next();
  while (!post.done) {
    remainingPosts.push(post.value);
    post = wholesomePostIterator.next();
  }

  let shuffledDayOnePosts = dayOnePosts
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  let shuffledRemainingPosts = remainingPosts
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return [...shuffledDayOnePosts, ...shuffledRemainingPosts];
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const doubleUserIds = await queryInterface.sequelize.query(
      `SELECT id, username from Users;`
    );
    const userIDs = doubleUserIds[0];
    const totalUsers = userIDs.length;

    const doublePostIds = await queryInterface.sequelize.query(
      `SELECT * FROM Posts ORDER BY postNumber ASC, informationType`
    );
    const postIDs = doublePostIds[0];
    const totalPosts = postIDs.length;

    const feeds = Array.from({ length: 3000 }, (v, i) => i).map((i) => {
      return {
        id: uuidv4(),
        user: userIDs[i].id,
        createdAt: timeOfRun,
        updatedAt: timeOfRun,
      };
    });

    // console.log({ doubleUserIds });

    await queryInterface.bulkInsert("Feeds", feeds);

    const doubleFeedIds = await queryInterface.sequelize.query(
      `SELECT id from Feeds;`
    );
    const feedIDs = doubleFeedIds[0];

    const allocation = feedIDs.map((feedID, ix) => {
      //add 25 posts to this feed for each user
      var allocations = [];
      let distribution = getPostDistribution(postIDs);
      for (var i = 0; i < 25; i++) {
        allocations.push({
          id: uuidv4(),
          postId: distribution[i].id,
          feedId: feedID.id,
          order: i,
          createdAt: timeOfRun,
          updatedAt: timeOfRun,
        });
      }
      return allocations;
    });
    const flatAllocations = allocation.flat();
    const BATCH_SIZE = 1000;
    for (let i = 0; i < flatAllocations.length / BATCH_SIZE; i++) {
      console.log(`Adding Batch ${i}`);
      let batch = flatAllocations.slice(
        i * BATCH_SIZE,
        i * BATCH_SIZE + BATCH_SIZE
      );
      await queryInterface.bulkInsert("JunctionPostFeeds", batch);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Feeds", {});
    return await queryInterface.bulkDelete("JunctionPostFeeds", {});
  },
};
