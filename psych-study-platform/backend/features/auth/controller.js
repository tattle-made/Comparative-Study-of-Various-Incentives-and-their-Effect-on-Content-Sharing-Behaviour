const { User } = require("../../sequelize/models");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./token");
const {
  InvalidRefreshTokenError,
  UserCreationError,
  IncorrectPasswordError,
} = require("./errors");

class UserNotFoundError extends Error {}

async function createUser(newUser) {
  try {
    const user = await User.create(newUser);
    return user;
  } catch (err) {
    // console.error("Could not create user", err);
    throw new UserCreationError();
  }
}

async function loginUser(loginReqPayload) {
  const { username, password } = loginReqPayload;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user === undefined) {
    throw new UserNotFoundError("User not found in database");
  } else {
    const { id, username, role } = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      const accessToken = await generateAccessToken(username, role);
      const refreshToken = await generateRefreshToken(username, role);
      return {
        id,
        username,
        role,
        accessToken,
        refreshToken,
      };
    } else {
      throw new IncorrectPasswordError("Incorrect Password");
    }
  }
}

async function refreshToken(refreshToken) {
  const user = await User.findOne({
    where: {
      refreshToken,
    },
  });

  if (user === undefined) {
    throw new Error("Invalid Token");
  } else {
    try {
      const { id, username, role } = user;
      const isValid = await verifyRefreshToken(token);
      if (isValid) {
        const accessToken = await generateAccessToken(id, username, role);
        return {
          id,
          username,
          role,
          accessToken,
        };
      }
    } catch (err) {
      throw err;
    }
  }
}

async function logoutUser(accessToken) {}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
};
