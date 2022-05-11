const { StatusCodes } = require("http-status-codes");
const { sharePost: sharePostController } = require("./controller");

async function sharePost(req, res) {
  const { post, userMetric, action } = req.body;
  const { informationType } = post;
  const { type: studyType } = userMetric;
  const { user } = req;

  const { updateMetric } = postMetricManagerFactory(post, user, action);

  try {
    await updateMetric();
  } catch (err) {
    if (err instanceof InvalidSharePostPayload) {
      res.status(StatusCodes.BAD_REQUEST).send();
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}

module.exports = (expressApp) => {
  expressApp.post("/share", sharePost);
};
