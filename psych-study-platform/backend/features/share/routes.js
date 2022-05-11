const { StatusCodes } = require("http-status-codes");
const { createOrUpdateShareMetric } = require("./controller");

async function sharePost(req, res) {
  const { postId, action } = req.body;
  const { user } = req;

  try {
    await createOrUpdateShareMetric({ id: user.id }, { id: postId }, action);
    res.status(200).send({ msg: "done" });
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
