function getFeed(req, res) {
  res.json(req.user);
}

module.exports = (expressApp) => {
  expressApp.get("/feed", getFeed);
};
