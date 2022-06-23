exports.userFactory = (googleSheetRow) => {
  return {
    email: googleSheetRow.email,
    session: googleSheetRow.session,
    username: googleSheetRow.username,
    password: googleSheetRow.password,
    currentStatus: googleSheetRow.current_status,
    currentStatusTS: googleSheetRow.current_status_ts,
    onboardingEmail: googleSheetRow.onboarding_email,
    onboardingEmailTS: googleSheetRow.onboarding_email_ts,
    postDay1ReminderEmail: googleSheetRow.post_day_1_reminder_email,
    postDay1ReminderEmailTS: googleSheetRow.post_day_1_reminder_email_ts,
    postDay2ReminderEmail: googleSheetRow.post_day_2_reminder_email,
    postDay2ReminderTS: googleSheetRow.post_day_2_reminder_email_ts,
    UnloggedInUserReminderEmail: googleSheetRow.reminder_email,
    UnloggedInUserReminderTS: googleSheetRow.reminder_email_ts,
    paymentReminderEmail: googleSheetRow.payment_reminder_email,
    paymentReminderTS: googleSheetRow.payment_reminder_email_ts,
  };
};
