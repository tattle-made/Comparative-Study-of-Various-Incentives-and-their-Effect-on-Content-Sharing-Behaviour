"use strict";
const posts = require("./posts.json");
const users = require("./userData.json");
const { v4: uuidv4 } = require("uuid");

const timeOfRun = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    const doubleUserIds = await queryInterface.sequelize.query(
      `SELECT id, username from Users;`
    );
    const userIDs = doubleUserIds[0];
    const totalUsers = userIDs.length;

    const doublePostIds = await queryInterface.sequelize.query(
      `SELECT id from Posts;`
    );
    const postIDs = doublePostIds[0];
    const totalPosts = postIDs.length;

    const feeds = Array.from({ length: 2000 }, (v, i) => i).map((i) => {
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
      for (var i = 0; i < 25; i++) {
        const randomPostIx = Math.floor(Math.random() * totalPosts);
        allocations.push({
          id: uuidv4(),
          postId: postIDs[randomPostIx].id,
          feedId: feedID.id,
          createdAt: timeOfRun,
          updatedAt: timeOfRun,
        });
      }
      return allocations;
    });
    const flatAllocations = allocation.flat();
    // console.log(flatAllocations);
    await queryInterface.bulkInsert("JunctionPostFeeds", flatAllocations);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
