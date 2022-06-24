exports.sleep = (time) =>
  new Promise((res) => setTimeout(res, time, "done sleeping"));
