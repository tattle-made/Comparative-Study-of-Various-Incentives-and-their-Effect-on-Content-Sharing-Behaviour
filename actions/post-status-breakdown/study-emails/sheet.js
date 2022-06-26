/**
 * All things related to the interaction between Study Manager and
 * Google Spreadsheet used for this project
 */
const { userFactory } = require("./factory-user");
const { docs, study } = require("../config");
const {
  getRowsFromSpreadsheet,
  saveInSheet,
} = require("../core/service-sheet");

async function* studyUsersFromSpreadSheet() {
  for await (const row of getRowsFromSpreadsheet(
    docs.studyBookkeeping,
    "productionServerData"
  )) {
    try {
      const user = userFactory(row);
      if (isNaN(user.session)) {
        continue;
      }
      if (user.session <= study.MAX_SESSION) {
        yield { row, user };
      } else {
        continue;
      }
    } catch (err) {
      console.log(`Error Getting User for ${row.rowNumber}`);
      console.log(err);
    }
  }
  return;
}

async function scheduleEmailOnSheet(row, email) {
  const { type } = email;

  try {
    let payload;
    switch (type) {
      case "SCHEDULE_ONBOARDING_EMAIL":
        payload = {
          onboarding_email: "SCHEDULED",
          onboarding_email_ts: new Date().toUTCString(),
        };
        break;
      case "SCHEDULE_POST_DAY_1_EMAIL":
        payload = {
          post_day_1_reminder_email: "SCHEDULED",
          post_day_1_reminder_email_ts: new Date().toUTCString(),
        };
        break;
      case "SCHEDULE_POST_DAY_2_EMAIL":
        payload = {
          post_day_2_reminder_email: "SCHEDULED",
          post_day_2_reminder_email_ts: new Date().toUTCString(),
        };
        break;
      case "SCHEDULE_PAYMENT_REMINDER":
        payload = {
          payment_reminder_email: "SCHEDULED",
          payment_reminder_email_ts: new Date().toUTCString(),
        };
        break;
      case "SCHEDULE_EMAIL_TO_NON_LOGGED_IN_USER":
        payload = {
          login_reminder_email: "SCHEDULED",
          login_reminder_email_ts: new Date().toUTCString(),
        };
        break;
      default:
        console.log("unexpected schedule");
    }
    await saveInSheet(row, payload);
  } catch (err) {
    console.log(`Error scheduling ${type} email `);
    console.error(err);
  }
}

const payloadMap = {
  onboarding: {
    onboarding_email: "SENT",
    onboarding_email_ts: new Date().toUTCString(),
  },
  postDay1Reminder: {
    post_day_1_reminder_email: "SENT",
    post_day_1_reminder_email_ts: new Date().toUTCString(),
  },
  postDay2Reminder: {
    post_day_2_reminder_email: "SENT",
    post_day_2_reminder_email_ts: new Date().toUTCString(),
  },
  unLoggedInUserReminder: {
    login_reminder_email: "SENT",
    login_reminder_email_ts: new Date().toUTCString(),
  },
  paymentReminder: {
    payment_reminder_email: "SENT",
    payment_reminder_email_ts: new Date().toUTCString(),
  },
};

async function recordSentEmailOnSheet(row, email) {
  const { type } = email;
  const payload = payloadMap[type];

  try {
    await saveInSheet(row, payload);
  } catch (err) {
    console.log(`Error updating email status on sheet`);
    console.error(err);
  }
}

async function updateUser(row, userMetrics) {
  if (userMetrics) {
    const payload = {
      current_status: userMetrics.stage,
      current_status_ts: new Date().toUTCString(),
      payment_due:
        userMetrics.type === "VANITY" ? 200 : userMetrics.points + 200,
    };

    await saveInSheet(row, payload);
  }
}

module.exports = {
  studyUsersFromSpreadSheet,
  scheduleEmailOnSheet,
  recordSentEmailOnSheet,
  updateUser,
};
