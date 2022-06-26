const core = require("@actions/core");
const { updateDashboard } = require("./controller-dashboard");
const { updateUserStatusOnGoogleSheet } = require("./controller-user");
const { manage } = require("./study-emails");

try {
  (async function () {
    const mode = core.getInput("mode");
    console.log(`Mode : ${mode}`);
    console.log(`Env : ${process.env.NODE_ENV}`);
    switch (mode) {
      case "UPDATE_DASHBOARD":
        await updateDashboard();
        break;
      case "UPDATE_USER":
        await manage.updateUserOnSheet();
        break;
      case "SCHEDULE_STUDY_EMAIL":
        await manage.scheduleEmails();
        break;
      case "SEND_STUDY_EMAIL":
        await manage.sendEmails();
        break;
      case "SCHEDULE_PAYMENT_MAILS":
        break;
      case "SEND_PAYMENT_MAILS":
        break;
      case "UPDATE_DATA_ANALYSIS_SHEET":
        break;
      case "TEST_RUN":
        console.log(`Running Test Run Manager`);
        break;
      default:
        break;
    }
    process.exit();
  })();
} catch (err) {
  core.setFailed(err.message);
}
