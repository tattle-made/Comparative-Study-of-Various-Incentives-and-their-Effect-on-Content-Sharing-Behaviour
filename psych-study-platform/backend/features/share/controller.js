const { User, Post, PostMetric, Metric } = require("../../sequelize/models");
const { shareMetricManagerFactory } = require("./metricManagerFactory");

async function createOrUpdateShareMetric(user, post, action) {
  try {
    const [userRes, postRes, metricRes, postMetricRes] = await Promise.all([
      User.makeBareBones(user.id),
      Post.findOne({ where: { id: post.id } }),
      Metric.findOne({ where: { user: user.id } }),
      PostMetric.findOne({
        where: {
          user: user.id,
          post: post.id,
        },
      }),
    ]);
    const { updateMetric } = await shareMetricManagerFactory(
      userRes,
      postRes,
      metricRes,
      postMetricRes,
      action
    );
    const metrics = await updateMetric();
    return metrics;
  } catch (err) {
    console.log({ ERR: err });
  }
}

async function getUserMetrics(userId) {
  return Metric.findOne({ where: { user: userId } });
}

module.exports = {
  createOrUpdateShareMetric,
  getUserMetrics,
};