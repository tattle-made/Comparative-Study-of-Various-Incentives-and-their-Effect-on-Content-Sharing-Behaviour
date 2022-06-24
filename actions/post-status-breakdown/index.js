const core = require("@actions/core");
const { updateDashboard } = require("./dashboardController");
const {
  scheduleStudyEmails,
  sendStudyEmails,
} = require("./userStudyEmailManager");

try {
  (async function () {
    const mode = core.getInput("mode");
    console.log(`Running Action in ${mode} Mode`);
    switch (mode) {
      case "UPDATE_DASHBOARD":
        await updateDashboard();
        break;
      case "SCHEDULE_STUDY_EMAIL":
        await scheduleStudyEmails();
        break;
      case "SEND_STUDY_EMAIL":
        // await sendStudyEmails();
        break;
      case "SCHEDULE_REMINDER_EMAILS":
        break;
      case "SEND_REMINDER_EMAILS":
        break;
      case "UPDATE_DATA_ANALYSIS_SHEET":
        break;
      default:
        break;
    }
    process.exit();
  })();
} catch (err) {
  core.setFailed(err.message);
}
