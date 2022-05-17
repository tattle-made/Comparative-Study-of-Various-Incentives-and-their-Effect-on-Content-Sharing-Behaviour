const { checkAndUpdate } = require("./controller");
const {
  UnableToCreateNewStudyPhase,
  UnableToUpdateStudyPhase,
  UnableToGoToNextPhaseError,
} = require("./error");
const { StatusCodes } = require("http-status-codes");

async function upgradePhase(req, res) {
  const { user } = req;
  try {
    await checkAndUpdate(user.id);
    res.json({ msg: "done" });
  } catch (err) {
    if (
      err instanceof UnableToCreateNewStudyPhase ||
      err instanceof UnableToUpdateStudyPhase ||
      err instanceof UnableToGoToNextPhaseError
    ) {
      res.status(StatusCodes.BAD_REQUEST).send({ msg: err.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}

module.exports = (expressApp) => {
  expressApp.post("/api/study-phase", upgradePhase);
};
