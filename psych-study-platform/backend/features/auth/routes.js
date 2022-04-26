const {
  loginUser,
  refreshToken: refreshTokenController,
  logoutUser,
} = require("./controller");
const { StatusCodes } = require("http-status-codes");
const {
  InvalidRefreshTokenError,
  UserCreationError,
  IncorrectPasswordError,
  UserNotFoundError,
} = require("./errors");

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await loginUser({ username, password });
    res.json(user);
  } catch (err) {
    if (err instanceof IncorrectPasswordError) {
      res.status(StatusCodes.FORBIDDEN).json({ msg: "Incorrect Password" });
    } else if (err instanceof UserNotFoundError) {
      res.status(StatusCodes.FORBIDDEN).json({ msg: "User not found" });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Unexpected Input" });
    }
  }
}

async function logout(req, res) {
  try {
    const { refreshToken } = req.body;
    await logoutUser(refreshToken);
    res.status(StatusCodes.OK).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  try {
    const user = await refreshTokenController(refreshToken);
    res.send(user);
  } catch (err) {
    if (err instanceof InvalidRefreshTokenError) {
      res.status(StatusCodes.FORBIDDEN).send();
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}

module.exports = (expressApp) => {
  expressApp.post("/login", login);
  expressApp.post("/logout", logout);
  expressApp.post("/auth/refreshToken", refreshToken);
};
