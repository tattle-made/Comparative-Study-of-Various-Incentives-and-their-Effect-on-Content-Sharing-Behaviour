const { sheets, study: studyConfig } = require("../config");
const { sendEmail } = require("../core/service-email");
const { makeEmail } = require("./factory-email");
const { emailFields, scheduledEmailFields } = require("./factory-user");
const { findScheduledEmails } = require("./rules");
const { studyUsersFromSpreadSheet, scheduleEmailOnSheet } = require("./sheet");

async function scheduleEmails() {
  for await (const studyUser of studyUsersFromSpreadSheet()) {
    const { row, user } = studyUser;
    console.log({ user: user.username });
    const scheduledEmails = findScheduledEmails(user);
    for (const email of scheduledEmails) {
      await scheduleEmailOnSheet(row, email);
    }
  }
}

async function sendEmails() {
  for await (const studyUser of studyUsersFromSpreadSheet()) {
    const { row, user } = studyUser;
    for await (const emailField of scheduledEmailFields(user)) {
      const email = makeEmail(emailField.type, user);
      sendEmail(email);
      // todo : update row on sheet
    }
  }
}

module.exports = {
  scheduleEmails,
  sendEmails,
};
