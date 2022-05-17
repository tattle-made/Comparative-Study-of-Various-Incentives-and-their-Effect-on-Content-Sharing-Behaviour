const { getFeed: getFeedController } = require("./controller");
const { FeedNotFound } = require("./errors");
const { StatusCodes } = require("http-status-codes");

async function getFeed(req, res) {
  try {
    const { id } = req.user;
    const feed = await getFeedController(id);
    res.send(feed);
  } catch (err) {
    if (err instanceof FeedNotFound) {
      res.status(StatusCodes.NO_CONTENT).send();
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}

module.exports = (expressApp) => {
  expressApp.get("/api/feed", getFeed);
};
