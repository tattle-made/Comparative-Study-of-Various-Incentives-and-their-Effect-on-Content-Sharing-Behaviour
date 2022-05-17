const { StatusCodes } = require("http-status-codes");
const {
  createOrUpdateShareMetric,
  getUserMetrics: getUserMetricsController,
} = require("./controller");

async function sharePost(req, res) {
  const { postId, action } = req.body;
  const { user } = req;

  try {
    const metrics = await createOrUpdateShareMetric(
      { id: user.id },
      { id: postId },
      action
    );
    res.status(200).send(metrics);
  } catch (err) {
    if (err instanceof InvalidSharePostPayload) {
      res.status(StatusCodes.BAD_REQUEST).send();
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}

async function getUserMetrics(req, res) {
  const { user } = req;
  try {
    const userMetrics = await getUserMetricsController(user.id);
    res.json(userMetrics.toJSON());
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

module.exports = (expressApp) => {
  expressApp.post("/api/share", sharePost);
  expressApp.get("/api/user-metrics", getUserMetrics);
};
