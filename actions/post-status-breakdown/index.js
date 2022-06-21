const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log("Hello");
  core.setOutput("hello", { user: "tattle" });
} catch (err) {
  core.setFailed(err.message);
}
