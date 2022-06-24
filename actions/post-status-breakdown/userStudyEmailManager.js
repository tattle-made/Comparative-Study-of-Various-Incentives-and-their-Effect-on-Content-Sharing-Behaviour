const core = require("@actions/core");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "14RYZt4UofeRyascpsyjagnxYQ3kbgJMB9B5vayE5H9Y"
);
const mysql = require("mysql2/promise");
const { config } = require("./config");
// const {
//   sendOnboardingEmail,
//   sendPostDayOneReminder,
//   sendPostDayTwoReminder,
//   sendReminderEmailToNonLoggedInUsers,
// } = require("./email");
const { userFactory } = require("./userFactory");
const { sleep } = require("./util");

const MS_PER_DAY = 24 * 60 * 60 * 1000;

exports.scheduleStudyEmails = async () => {
  console.log("Scheduling Study Emails");

  try {
    const googleServiceAccountCredentials = JSON.parse(
      process.env.GOOGLE_CREDENTIALS
    );

    await doc.useServiceAccountAuth(googleServiceAccountCredentials);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[8];
    const rows = await sheet.getRows();

    for (const row of rows) {
      try {
        const user = userFactory(row);
        if (isNaN(user.session)) {
          continue;
        }
        if (user.session < config.MAX_SESSION) {
          console.log(`Processing ${row.rowNumber}`);
          const scheduledEmails = findScheduledEmails(user);
          for (const email of scheduledEmails) {
            await scheduleEmailOnSheet(row, email);
          }
        } else {
          console.log(`${user.username}'s session is inactive`);
        }
      } catch (err) {
        console.log(`Error Saving ${row.rowNumber}`);
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
    core.setFailed(err.message);
  }
};

exports.sendStudyEmails = (googleSheetUser) => {
  console.log("Sending Study Emails");
};

const findScheduledEmails = (user) => {
  const { currentStatus, currentStatusTS } = user;
  const { onboardingEmail, onboardingEmailTS } = user;
  const { postDay1ReminderEmail, postDay1ReminderEmailTS } = user;
  const { postDay2ReminderEmail, postDay2ReminderTS } = user;
  const { UnloggedInUserReminderEmail, UnloggedInUserReminderTS } = user;
  const { paymentReminderEmail, paymentReminderTS } = user;

  const emails = [];

  if (isEmpty(currentStatus) && isEmpty(onboardingEmail)) {
    emails.push({ type: "SCHEDULE_ONBOARDING_EMAIL", user });
  }

  if (
    ["UNUSED", "CONSENT", "ONBOARDING", "TEST_DAY_01"].includes(currentStatus)
  ) {
    if (daysSince(onboardingEmailTS) > 1 && isEmpty(postDay1ReminderEmail)) {
      emails.push({ type: "SCHEDULE_POST_DAY_1_EMAIL", user });
    }
  }

  if (currentStatus === "TEST_DAY_02") {
    if (
      daysSince(postDay1ReminderEmailTS) > 1 &&
      isEmpty(postDay2ReminderEmail)
    ) {
      emails.push({ type: "SCHEDULE_POST_DAY_2_EMAIL", user });
    }
  }

  if (["TEST_DAY_03", "FINISHED", "POST_TEST_SURVEY"].includes(currentStatus)) {
    if (daysSince(postDay2ReminderTS) > 1 && isEmpty(paymentReminderEmail)) {
      emails.push({ type: "SCHEDULE_PAYMENT_REMINDER", user });
    }
  }

  if (isEmpty(currentStatus) && daysSince(onboardingEmailTS) > 3) {
    emails.push({ type: "SCHEDULE_EMAIL_TO_NON_LOGGED_IN_USER", user });
  }

  return emails;
};

exports.findScheduledEmails = findScheduledEmails;

function daysSince(ts) {
  const tsDate = new Date(ts);
  const now = new Date();
  return (now - tsDate) / MS_PER_DAY;
}

function isEmpty(cellData) {
  return cellData.length === 0;
}

async function scheduleEmailOnSheet(row, email) {
  const { type } = email;

  try {
    switch (type) {
      case "SCHEDULE_ONBOARDING_EMAIL":
        row.onboarding_email = "SCHEDULED";
        row.onboarding_email_ts = new Date().toUTCString();
        break;
      case "SCHEDULE_POST_DAY_1_EMAIL":
        row.post_day_1_reminder_email = "SCHEDULED";
        row.post_day_1_reminder_email_ts = new Date().toUTCString();
        break;
      case "SCHEDULE_POST_DAY_2_EMAIL":
        row.post_day_2_reminder_email = "SCHEDULED";
        row.post_day_2_reminder_email_ts = new Date().toUTCString();
        break;
      case "SCHEDULE_PAYMENT_REMINDER":
        row.payment_reminder_email = "SCHEDULED";
        row.payment_reminder_email_ts = new Date().toUTCString();
        break;
      case "SCHEDULE_EMAIL_TO_NON_LOGGED_IN_USER":
        row.login_reminder_email = "SCHEDULED";
        row.login_reminder_email_ts = new Date().toUTCString();
        break;
      default:
        console.log("unexpected schedule");
    }
    await row.save();
    await sleep(1000);
  } catch (err) {
    console.log(`Error scheduling ${type} email `);
    console.error(err);
  }
}

async function sendEmail(email) {
  const { type, user } = email;
  switch (type) {
    case "SCHEDULE_ONBOARDING_EMAIL":
      await sendOnboardingEmail(user);
      break;
    case "SCHEDULE_POST_DAY_1_EMAIL":
      await sendPostDayOneReminder(user);
      break;
    case "SCHEDULE_POST_DAY_2_EMAIL":
      await sendPostDayTwoReminder(user);
      break;
    case "SCHEDULE_PAYMENT_REMINDER":
      break;
    case "SCHEDULE_EMAIL_TO_NON_LOGGED_IN_USER":
      await sendReminderEmailToNonLoggedInUsers(user);
      break;
    default:
      console.log("unexpected schedule");
  }
}
