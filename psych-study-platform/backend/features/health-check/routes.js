function healthCheck(req, res) {
  res.json({ msg: "ok" });
}

module.exports = (expressApp) => {
  expressApp.get("/api/", healthCheck);
};
