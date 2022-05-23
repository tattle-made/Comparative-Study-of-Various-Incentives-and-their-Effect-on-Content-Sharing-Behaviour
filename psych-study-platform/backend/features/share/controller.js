const { User, Post, PostMetric, Metric } = require("../../sequelize/models");
const { shareMetricManagerFactory } = require("./metricManagerFactory");

async function getUserMetrics(userId) {
  return Metric.findOne({ where: { user: userId } });
}

async function addPostMetric(userId, postId, name, value) {
  await PostMetric.create({
    user: userId,
    post: postId,
    name,
    value,
  });

  if (name === "SHARE" && value === "YES") {
    const [postRes, metricRes] = await Promise.all([
      Post.findOne({ where: { id: postId } }),
      Metric.findOne({ where: { user: userId } }),
    ]);
    const { updateMetric } = await shareMetricManagerFactory(
      postRes,
      metricRes
    );
    const metrics = await updateMetric();
    return metrics;
  } else {
    return;
  }
}

module.exports = {
  getUserMetrics,
  addPostMetric,
};
