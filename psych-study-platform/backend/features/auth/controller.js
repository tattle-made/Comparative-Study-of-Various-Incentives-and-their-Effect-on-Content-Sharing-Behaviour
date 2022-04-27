const { User } = require("../../sequelize/models");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("./token");
const {
  InvalidRefreshTokenError,
  UserCreationError,
  IncorrectPasswordError,
  UserNotFoundError,
} = require("./errors");

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
  if (user === null) {
    throw new UserNotFoundError("User not found in database");
  } else {
    const { id, username, role } = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      const accessToken = await generateAccessToken(id, username, role);
      const refreshToken = await generateRefreshToken(id, username, role);

      user.set({ refreshToken });
      const updatedUser = await user.save();

      return {
        id: updatedUser.id,
        username: updatedUser.username,
        role: updatedUser.role,
        refreshToken: updatedUser.refreshToken,
        accessToken,
      };
    } else {
      throw new IncorrectPasswordError();
    }
  }
}

async function refreshToken(refreshToken) {
  const user = await User.findOne({
    where: {
      refreshToken,
    },
  });

  if (user === null) {
    throw new InvalidRefreshTokenError();
  } else {
    try {
      const { id, username, role } = user;
      const isValid = await verifyRefreshToken(refreshToken);
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

async function logoutUser(token) {
  await User.update(
    {
      refreshToken: null,
    },
    {
      where: {
        refreshToken: token,
      },
    }
  );
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
};
