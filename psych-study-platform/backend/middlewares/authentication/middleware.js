const { StatusCodes } = require("http-status-codes");
const { verifyAccessToken } = require("../../features/auth/token");

const whitelistedUrls = ["/login", "/"];

const authenticationMiddleware = async (req, res, next) => {
  // extract token from request headers

  if (
    req.originalUrl.startsWith("/auth/") ||
    req.originalUrl.startsWith("/pages/") ||
    whitelistedUrls.includes(req.originalUrl)
  ) {
    next();
  } else {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token === null) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Access Token is missing" });
      } else {
        try {
          const user = await verifyAccessToken(token);
          req.user = user;
          next();
        } catch (error) {
          res
            .status(StatusCodes.UNAUTHORIZED)
            .send({ error: "Your token has expired. Please refresh it" });
        }
      }
    } catch (error) {
      console.log("Error : Could not authenticate request", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ msg: "Internal Server Error" });
    }
  }
};

module.exports = {
  authenticationMiddleware,
};
