const { StatusCodes } = require("http-status-codes");
const { createEvent: createEventController } = require("./controller");
const { InvalidCreateEventPayload } = require("./errors");

async function createEvent(req, res) {
  const { postId, name, value } = req.body;
  const userId = req.user.id;
  try {
    await createEventController({
      userId,
      postId,
      name,
      value,
    });
    res.status(StatusCodes.OK).send();
  } catch (err) {
    if (err instanceof InvalidCreateEventPayload) {
      res.status(StatusCodes.BAD_REQUEST).send();
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
}

async function updateEvent(req, res) {}

module.exports = (expressApp) => {
  expressApp.post("/event", createEvent);
  expressApp.patch("/event", updateEvent);
};
