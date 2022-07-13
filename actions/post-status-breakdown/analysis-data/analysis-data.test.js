const { connection } = require("../core/service-db");
const { getUsersFinished } = require("./db");
const { writeFile } = require("fs").promises;

it("test get completed users from db", async () => {
  const conn = await connection();
  let userCount = 0;
  const expectedUserCount = 894; // change this with actual value from database
  const users = [];
  for await (const user of getUsersFinished(conn)) {
    userCount++;
  }
  expect(userCount).toBe(expectedUserCount);
}, 30000);
