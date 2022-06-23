const core = require("@actions/core");
const { updateDashboard } = require("./dashboardController");

try {
  (async function () {
    const mode = core.getInput("mode");
    console.log(`Running Action in ${mode} Mode`);
    switch (mode) {
      case "UPDATE_DASHBOARD":
        await updateDashboard();
        break;
      case "SCHEDULE_AND_SEND_STUDY_EMAIL":
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
