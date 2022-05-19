"use strict";
const { generateUsername } = require("friendly-username-generator");
var generatePassword = require("password-generator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const randomName = require("indian-name-generator");

function getRandomName() {
  let val = Math.floor(Math.random() * 4);
  let name = "";
  if (val === 0) name = randomName.randomBengali();
  else if (val === 1) name = randomName.randomGujarati();
  else if (val === 2) name = randomName.maleMarathi();
  else if (val === 3) name = randomName.randomPunjabi();
  else name = randomName.randomPunjabi();
  return name + Math.floor(Math.random() * 2022);
}

function generateUniqueRandomNames(size) {
  console.log("GENERATING UNIQUE NAMES START");
  let userNames = new Set();
  while (userNames.size < size) {
    console.log(userNames.size);
    userNames.add(getRandomName().slice(0, 25).toLowerCase());
  }

  // let postIDs = new Set();

  // while (postIDs.size < 25) {
  //   postIDs.add(Math.floor(Math.random() * 50));
  // }

  console.log("GENERATING UNIQUE NAMES STOP");
  return userNames;
}

const timeOfRun = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    let uniqueNames = generateUniqueRandomNames(3000);
    let uniqueNameArray = Array.from(uniqueNames);
    const userData = [];
    const usersPayloadPromises = Array.from({ length: 3000 }, (v, i) => i).map(
      async (i) => {
        const username = uniqueNameArray[i];
        const password = generatePassword();
        const id = uuidv4();
        userData.push({ id, username, password });
        const payload = {
          id,
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

    console.log("HASHING PASSWORDS START");
    const usersPayload = await Promise.all(usersPayloadPromises);
    console.log("HASHING PASSWORDS STOP");
    // console.log(usersPayload);

    try {
      await queryInterface.bulkInsert("Users", usersPayload);
    } catch (err) {
      console.log("COULD NOT ADD USERS");
      console.log(err);
    }

    const studyPhasePayloads = usersPayload.map((user) => {
      return {
        id: uuidv4(),
        user: user.id,
        type: Math.floor(Math.random() * 2) === 0 ? "MONETARY" : "VANITY",
        points: 0,
        createdAt: timeOfRun,
        updatedAt: timeOfRun,
      };
    });

    return await queryInterface.bulkInsert("Metrics", studyPhasePayloads);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", {});
    return await queryInterface.bulkDelete("Metrics", {});
  },
};
