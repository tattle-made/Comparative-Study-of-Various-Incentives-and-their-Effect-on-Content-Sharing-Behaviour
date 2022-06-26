const { connection } = require("../core/service-db");
const { sendEmail } = require("../core/service-email");
const { sleep } = require("../core/util");
const { getUserStatusAndMetrics } = require("./db");
const { makeEmail } = require("./factory-email");
const { manage } = require("./index");
const config = require("../config");
const { updateUserOnSheet } = require("./manager");

async function testCheckConfigFile() {
  console.log(config);
}

/**
 * Reads the sheet mentioned in
 * `config.docs.studyBookkeeping.sheets.productionServerData`
 * and updates values in that sheet. Please check if your config data
 * is pointing to the right document.
 */
async function testScheduleEmails() {
  await manage.scheduleEmails();
}

/**
 * Reads the sheet mentioned in
 * `config.docs.studyBookkeeping.sheets.productionServerData`
 * and updates values in that sheet. Please check if your config data
 * is pointing to the right document.
 * This function also sends real emails using aws ses to the
 * email address mentioned in `config.email.testTarget`.
 */
async function testSendEmails() {
  await manage.sendEmails();
}

/**
 * This function sends out a real email to a test user specified in
 * config.email.testTarget. Please ensure that NODE_ENV is set to "test".
 * If NODE_ENV is not set, the email client will attempt to send the
 * email hardcoded in this function - test@test.com
 *
 * Prerequisite to running this function is setting the following environment
 * variables related to AWS SES - SERVICE_AWS_ACCESS_KEY_ID and SERVICE_AWS_SECRET_ACCESS_KEY
 *
 *
 */
async function testSendAllTypeOfEmails() {
  const user = {
    email: "test@test.com",
    username: "test",
    password: "pass",
  };
  const onboardingEmail = makeEmail("onboarding", user);
  await sendEmail(onboardingEmail);
  await sleep(1000);

  const postDay1Email = makeEmail("postDay1Reminder", user);
  await sendEmail(postDay1Email);
  await sleep(1000);

  const postDay2Email = makeEmail("postDay2Reminder", user);
  await sendEmail(postDay2Email);
  await sleep(1000);

  const unLoggedInUserReminderEmail = makeEmail("unLoggedInUserReminder", user);
  await sendEmail(unLoggedInUserReminderEmail);
  await sleep(1000);

  const paymentReminderEmail = makeEmail("paymentReminder", user);
  await sendEmail(paymentReminderEmail);
}

/**
 * initializes a sql connection and get metrics for a user
 * the hardcoded userId parameter may be invalid depending on the database.
 * Make sure you get a valid userId from the sql database.
 */
async function testGetUserStatusAndMetrics() {
  const conn = await connection();
  const metrics = await getUserStatusAndMetrics(
    conn,
    "354fa7fd-c84f-41a4-a3c3-12e939c8ea31"
  );
  if (metrics) {
    console.log(metrics);
  } else {
    console.log(`No metrics exist for this user`);
  }
}

async function testUpdateUser() {
  await updateUserOnSheet();
}

(async function test() {
  const env = process.env.NODE_ENV;
  console.log(`Environment : ${env}`);

  // console.log(`Test : Check Config File`);
  // await testCheckConfigFile();

  // console.log(`Test : Schedule Emails`);
  // await testScheduleEmails();

  // console.log(`Test : Send Emails`);
  // await testSendEmails();

  // console.log(`Test : Send All Types of Emails`);
  // await testSendAllTypeOfEmails();

  // console.log(`Test : Get User Status and Metrics`);
  // await testGetUserStatusAndMetrics();

  console.log(`Test : Update User`);
  await testUpdateUser();

  process.exit();
})();
