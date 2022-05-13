const { saveForm } = require("./controller");
const { CouldNotSaveSurveyResponse } = require("./error");
const { StatusCodes } = require("http-status-codes");

async function saveSurveyResponse(req, res) {
  const { user } = req;
  const { survey } = req.body;
  try {
    await saveForm(user.id, survey);
    res.json({ msg: "done" });
  } catch (err) {
    if (err instanceof CouldNotSaveSurveyResponse) {
      res.status(StatusCodes.BAD_REQUEST).send();
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}

module.exports = (expressApp) => {
  expressApp.post("/survey-form", saveSurveyResponse);
};
