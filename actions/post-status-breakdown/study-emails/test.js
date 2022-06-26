const { sendEmail } = require("../core/service-email");
const { sleep } = require("../core/util");
const { makeEmail } = require("./factory-email");
const { manage } = require("./index");

async function testScheduleEmails() {
  await manage.scheduleEmails();
}

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

(async function test() {
  const env = process.env.NODE_ENV;
  console.log(`Environment : ${env}`);

  // console.log(`Test : Schedule Emails`);
  // testScheduleEmails();

  // console.log(`Test : Send Emails`);
  // testSendEmails();

  // console.log(`Test : Send All Types of Emails`);
  // await testSendAllTypeOfEmails();
})();
