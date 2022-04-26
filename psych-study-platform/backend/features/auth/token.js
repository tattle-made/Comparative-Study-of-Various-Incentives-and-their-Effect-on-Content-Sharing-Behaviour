const { InvalidRefreshTokenError } = require("./errors");
const { sign, verify } = require("jsonwebtoken");

const accessTokenKey = process.env.JWT_ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.JWT_REFRESH_TOKEN_KEY;

async function generateAccessToken(id, username, role) {
  const accessToken = await sign({ sub: username, id, role }, accessTokenKey, {
    expiresIn: "20 m", // allowed formats : "24 hours", "20 m"
  });

  return accessToken;
}

async function generateRefreshToken(id, username, role) {
  const refreshToken = await sign(
    { sub: username, id, role },
    refreshTokenKey,
    {
      expiresIn: "7 days", // allowed formats : "24 hours", "20 m"
    }
  );

  return refreshToken;
}

async function saveRefreshTokenInDb(userId, refreshToken) {
  await User.update(
    {
      refreshToken,
    },
    {
      where: {
        id: userId,
      },
    }
  );
}

async function verifyRefreshToken(token) {
  try {
    const payload = await verify(token, refreshTokenKey);
    if (payload) {
      return true;
    }
  } catch (err) {
    throw new InvalidRefreshTokenError();
  }
}

async function verifyAccessToken(token) {
  try {
    const payload = await verify(token, accessTokenKey);
    if (payload) {
      return payload;
    }
  } catch (err) {
    throw new InvalidRefreshTokenError();
  }
}

async function revokeRefreshToken(userId) {}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshTokenInDb,
  verifyRefreshToken,
  verifyAccessToken,
  revokeRefreshToken,
};
