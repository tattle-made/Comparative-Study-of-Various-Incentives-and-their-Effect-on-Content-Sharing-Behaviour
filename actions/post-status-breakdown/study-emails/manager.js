const { sendEmail } = require("../core/service-email");
const { makeEmail } = require("./factory-email");
const { scheduledEmailFields } = require("./factory-user");
const { findScheduledEmails } = require("./rules");
const {
  studyUsersFromSpreadSheet,
  scheduleEmailOnSheet,
  recordSentEmailOnSheet,
  updateUser,
} = require("./sheet");
const { connection } = require("../core/service-db");
const { getUserStatus, getUserStatusAndMetrics } = require("./db");

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
      console.log(emailField);
      const email = makeEmail(emailField.type, user);
      sendEmail(email);
      await recordSentEmailOnSheet(row, emailField);
    }
  }
}

async function updateUserOnSheet() {
  const conn = await connection();

  for await (const studyUser of studyUsersFromSpreadSheet()) {
    const { row: sheetRow, user } = studyUser;
    console.log(`Updating : ${user.username}`);

    const metrics = await getUserStatusAndMetrics(conn, user.userId);
    await updateUser(sheetRow, metrics);
  }
}

module.exports = {
  scheduleEmails,
  sendEmails,
  updateUserOnSheet,
};
