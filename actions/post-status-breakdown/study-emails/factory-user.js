function userFactory(googleSheetRow) {
  function sanitizeCellData(fieldName) {
    return googleSheetRow[fieldName] === undefined ||
      googleSheetRow[fieldName] === null ||
      googleSheetRow[fieldName].length === 0
      ? ""
      : googleSheetRow[fieldName];
  }
  return {
    email: googleSheetRow.email,
    userId: googleSheetRow.user_id,
    session: parseInt(googleSheetRow.session_number),
    username: googleSheetRow.username,
    password: googleSheetRow.password,
    currentStatus: sanitizeCellData("current_status"),
    currentStatusTS: sanitizeCellData("current_status_ts"),
    onboardingEmail: sanitizeCellData("onboarding_email"),
    onboardingEmailTS: sanitizeCellData("onboarding_email_ts"),
    postDay1ReminderEmail: sanitizeCellData("post_day_1_reminder_email"),
    postDay1ReminderEmailTS: sanitizeCellData("post_day_1_reminder_email_ts"),
    postDay2ReminderEmail: sanitizeCellData("post_day_2_reminder_email"),
    postDay2ReminderTS: sanitizeCellData("post_day_2_reminder_email_ts"),
    UnloggedInUserReminderEmail: sanitizeCellData("login_reminder_email"),
    UnloggedInUserReminderTS: sanitizeCellData("login_reminder_email_ts"),
    paymentReminderEmail: sanitizeCellData("payment_reminder_email"),
    paymentReminderTS: sanitizeCellData("payment_reminder_email_ts"),
  };
}

function* emailFields(user) {
  yield {
    type: "onboarding",
    status: user.onboardingEmail,
    time: user.onboardingEmailTS,
  };
  yield {
    type: "postDay1Reminder",
    status: user.postDay1ReminderEmail,
    time: user.postDay1ReminderEmailTS,
  };
  yield {
    type: "postDay2Reminder",
    status: user.postDay2ReminderEmail,
    time: user.postDay2ReminderTS,
  };
  yield {
    type: "unLoggedInUserReminder",
    status: user.UnloggedInUserReminderEmail,
    time: user.UnloggedInUserReminderTS,
  };
  yield {
    type: "paymentReminder",
    status: user.paymentReminderEmail,
    time: user.paymentReminderTS,
  };
}

function* scheduledEmailFields(user) {
  for (const emailField of emailFields(user)) {
    if (emailField.status === "SCHEDULED") {
      yield emailField;
    }
  }
}

module.exports = {
  userFactory,
  emailFields,
  scheduledEmailFields,
};
