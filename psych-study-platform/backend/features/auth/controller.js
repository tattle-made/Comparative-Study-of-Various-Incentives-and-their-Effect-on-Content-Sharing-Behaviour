const { User } = require("../../sequelize/models");
const bcrypt = require("bcrypt");

async function createUser(newUser) {
  return await User.create(...newUser);
}

async function login(loginReqPayload) {
  const { username, password } = loginReqPayload;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user === undefined) {
    throw new Error("User not found in database");
  } else {
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      return user.toJSON();
    } else {
      throw new Error("Incorrect Password");
    }
  }
}

async function refreshToken(refreshToken) {}

async function logout(accessToken) {}
