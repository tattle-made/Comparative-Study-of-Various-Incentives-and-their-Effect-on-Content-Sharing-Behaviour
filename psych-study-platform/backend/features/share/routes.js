const { StatusCodes } = require("http-status-codes");
const {
  createOrUpdateShareMetric,
  getUserMetrics: getUserMetricsController,
  addPostMetric,
} = require("./controller");

async function getUserMetrics(req, res) {
  const { user } = req;
  try {
    const userMetrics = await getUserMetricsController(user.id);
    res.json(userMetrics.toJSON());
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function postPostMetric(req, res) {
  const { id: userId } = req.user;
  const { postId, name, value } = req.body;
  try {
    const metrics = await addPostMetric(userId, postId, name, value);
    if (metrics) {
      res.status(StatusCodes.OK).send(metrics);
    } else {
      res.status(StatusCodes.OK).send();
    }
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

module.exports = (expressApp) => {
  expressApp.get("/api/user-metrics", getUserMetrics);
  expressApp.post("/api/post-metric", postPostMetric);
};
