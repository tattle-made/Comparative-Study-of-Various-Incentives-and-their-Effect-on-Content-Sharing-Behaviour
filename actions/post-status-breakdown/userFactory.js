exports.userFactory = (googleSheetRow) => {
  function sanitizeCellData(fieldName) {
    googleSheetRow[fieldName].length === 0 ||
    googleSheetRow[fieldName] === undefined ||
    googleSheetRow[fieldName] === null
      ? ""
      : googleSheetRow[fieldName];
  }
  return {
    email: googleSheetRow.email,
    session: parseInt(googleSheetRow.session),
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
};
