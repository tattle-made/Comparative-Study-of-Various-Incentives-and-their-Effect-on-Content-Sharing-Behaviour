const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log("Hello");
  const githubCredentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  const sqlUsername = process.env.DB_USERNAME;
  const sqlPassword = process.env.DB_PASSWORD;
  console.log({
    projectId: githubCredentials.project_id,
    sqlUsername,
    sqlPassword,
  });
  // core.setOutput("hello", { user: "tattle" });
} catch (err) {
  core.setFailed(err.message);
}

// console.log(github.secrets.GITHUB_CREDENTIALS)
// sql credentials
