"use strict";
const { v4: uuidv4 } = require("uuid");

const timeOfRun = new Date();

function getPostDistribution(posts) {
  let postIDs = new Set();

  while (postIDs.size < 25) {
    postIDs.add(Math.floor(Math.random() * 50));
  }

  postIDs = Array.from(postIDs);

  let selectedPosts = [];

  postIDs.map((postId, ix) => {
    if (ix >= 0 && ix < 5) {
      // PLAUSIBLE
      selectedPosts.push(posts[postId * 5 + 0]);
    } else if (ix >= 5 && ix < 10) {
      // IMPLAUSIBLE
      selectedPosts.push(posts[postId * 5 + 1]);
    } else if (ix >= 10 && ix < 15) {
      // TRUE
      selectedPosts.push(posts[postId * 5 + 2]);
    } else if (ix >= 15 && ix < 20) {
      // FALSE
      selectedPosts.push(posts[postId * 5 + 3]);
    } else if (ix >= 20 && ix < 25) {
      // WHOLESOME
      selectedPosts.push(posts[postId * 5 + 4]);
    } else {
      console.log("error");
    }
  });

  return selectedPosts
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
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

    console.log({ doubleUserIds });

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
          createdAt: timeOfRun,
          updatedAt: timeOfRun,
        });
      }
      return allocations;
    });
    const flatAllocations = allocation.flat();
    await queryInterface.bulkInsert("JunctionPostFeeds", flatAllocations);

    // console.log(flatAllocations);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Feeds", {});
    return await queryInterface.bulkDelete("JunctionPostFeeds", {});
  },
};
