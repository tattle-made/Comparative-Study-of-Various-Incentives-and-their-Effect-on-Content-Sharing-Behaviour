"use strict";
const data = require("./posts.json");
const { v4: uuidv4 } = require("uuid");

const time_of_run = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    const postPayload = data.map((item) => ({
      id: uuidv4(),
      createdAt: time_of_run,
      updatedAt: time_of_run,
      ...item,
    }));

    return await queryInterface.bulkInsert("Posts", postPayload);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Posts", {});
  },
};
