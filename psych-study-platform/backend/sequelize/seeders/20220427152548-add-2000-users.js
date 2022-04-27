"use strict";
const { generateUsername } = require("friendly-username-generator");
var generatePassword = require("password-generator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const timeOfRun = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = [];
    const usersPayloadPromises = Array.from({ length: 2000 }, (v, i) => i).map(
      async (i) => {
        const username = generateUsername({ useHyphen: false }).slice(0, 24);
        const password = generatePassword();
        userData.push({ username, password });
        const payload = {
          id: uuidv4(),
          username,
          password: await bcrypt.hash(password, 10),
          role: "PARTICIPANT",
          createdAt: timeOfRun,
          updatedAt: timeOfRun,
        };
        return payload;
      }
    );

    await fs.writeFile(
      "sequelize/seeders/userData.json",
      JSON.stringify(userData)
    );

    const usersPayload = await Promise.all(usersPayloadPromises);
    // console.log(usersPayload);

    return await queryInterface.bulkInsert("Users", usersPayload);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Users", {
      createdAt: time_of_run,
    });
  },
};
