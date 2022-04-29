const { Event } = require("../../sequelize/models");
const { EventNotCreated, InvalidCreateEventPayload } = require("./errors");

async function createEvent(payload) {
  try {
    const event = await Event.create(payload);
    return event;
  } catch (err) {
    console.log(err);
    throw new InvalidCreateEventPayload();
  }
}

module.exports = {
  createEvent,
};
