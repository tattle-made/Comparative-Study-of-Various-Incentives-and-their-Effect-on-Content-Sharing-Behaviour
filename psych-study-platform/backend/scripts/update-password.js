const { User } = require("../sequelize/models");
var generatePassword = require("password-generator");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

const preusedIDs = [
  "3878e7b2-8e81-4e88-b997-976f093c4af5",
  "b76ec23c-3ddb-4d88-9fd1-8d1a46b30448",
  "b9e025e0-2926-4a16-926e-220cae426c1b",
  "bc0e94e5-3e7d-4dec-a04b-04fa3abb4a8f",
  "f503e04c-a36b-4818-9b4b-ab972baf1591",
  "557764c7-fc44-46e4-8a44-2643f164328c",
  "452277c2-2968-41d1-b243-780649bfc268",
  "5e7a9e6f-db0b-4d74-8fab-a8ae5850f8f4",
  "c5bb1ca7-cf07-481d-9c98-61814c5af2a7",
  "634d8531-d042-41fa-b0c4-686bcd809dec",
  "f6c8932e-ce4e-46b5-97a4-3a6a2dc970ff",
  "d16e9b00-6be0-41f9-a6d1-2baff1923dc3",
  "68fd6661-3f10-4a48-82d4-af1abbe5e393",
  "519dec9c-3df1-486b-a45f-122469bb15b6",
  "6d20d521-da7a-4673-86f2-a44ba2f00a28",
  "21b83952-617f-4f8d-8492-0d7846a9657a",
  "103cf69e-cb6b-461d-b6cb-3d3e14ce11f8",
  "ad8e0a05-1730-41e3-b37c-92e1d76b20c0",
  "48411322-7b8b-490e-aa31-bb0f1bc50ca4",
  "fe2f1ee4-567e-434e-95cc-df7677625e84",
  "8abb934f-3538-4f67-92a2-dc888716bf99",
  "22603832-3833-443d-8ba5-2b706ae4ec33",
  "d0d8636d-914d-43a5-a007-e1941a6182e3",
  "5a8715fd-ec91-4dcd-982c-5573204ffc84",
  "20004cdb-e82f-4c63-9ffe-f211751cc0e7",
];
(async function repair() {
  const usernamePasswordMap = [];

  const result = await User.findAndCountAll();
  console.log(result.count);
  const BATCH_SIZE = 10;
  for (let i = 0; i < result.count / BATCH_SIZE; i++) {
    const users = await User.findAndCountAll({
      limit: BATCH_SIZE,
      offset: i * BATCH_SIZE,
    });
    for (let j = 0; j < users.rows.length; j++) {
      if (preusedIDs.includes(users.rows[j].id)) {
        console.log("skipping user");
      } else {
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);
        usernamePasswordMap.push({
          id: users.rows[j].id,
          username: users.rows[j].username,
          password: password,
        });
        await User.update(
          { password: hashedPassword },
          {
            where: {
              id: users.rows[j].id,
            },
          }
        );
        console.log("user updated");
      }
    }
  }

  await fs.writeFile(
    "sequelize/seeders/userPasswordMap.json",
    JSON.stringify(usernamePasswordMap)
  );
})();
