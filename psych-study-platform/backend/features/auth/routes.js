function login(req, res) {}

function logout(req, res) {}

function refreshToken(req, res) {}

module.exports = (expressApp) => {
  expressApp.get("/login", (req, res) => {
    // login(req, res);
    res.json({ msg: "done" });
  });

  expressApp.post("/logout", (req, res) => {
    logout(req, res);
  });

  expressApp.post("/refreshToken", (req, res) => {
    refreshToken(req, res);
  });
};
