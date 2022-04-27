"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const users = [
  { username: "participant_a", password: "pa1234", role: "PARTICIPANT" },
  { username: "participant_b", password: "pb1234", role: "PARTICIPANT" },
  { username: "manager_a", password: "ma1234", role: "MANAGER" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const usersPayloadPromises = users.map(async (user) => {
      const payload = {
        id: uuidv4(),
        username: user.username,
        password: await bcrypt.hash(user.password, 10),
        role: user.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return payload;
    });

    const usersPayload = await Promise.all(usersPayloadPromises);
    console.log(usersPayload);

    return await queryInterface.bulkInsert("Users", usersPayload);
  },

  async down(queryInterface, Sequelize) {
    const usernames = users.map((user) => user.username);

    await queryInterface.bulkDelete("Users", {
      username: usernames,
    });
  },
};
