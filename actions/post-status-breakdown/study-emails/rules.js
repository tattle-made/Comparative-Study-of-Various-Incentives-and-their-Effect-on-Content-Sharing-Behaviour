const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysSince(ts) {
  const tsDate = new Date(ts);
  const now = new Date();
  return (now - tsDate) / MS_PER_DAY;
}

function isEmpty(cellData) {
  return cellData.length === 0 || cellData === "SCHEDULED";
}

function findScheduledEmails(user) {
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

  if (["FINISHED", "POST_TEST_SURVEY"].includes(currentStatus)) {
    if (daysSince(postDay2ReminderTS) > 1 && isEmpty(paymentReminderEmail)) {
      emails.push({ type: "SCHEDULE_PAYMENT_REMINDER", user });
    }
  }

  if (
    isEmpty(currentStatus) &&
    daysSince(onboardingEmailTS) > 4 &&
    daysSince(onboardingEmailTS) < 5 &&
    isEmpty(onboardingEmail)
  ) {
    emails.push({ type: "SCHEDULE_EMAIL_TO_NON_LOGGED_IN_USER", user });
  }

  return emails;
}

module.exports = { findScheduledEmails };
