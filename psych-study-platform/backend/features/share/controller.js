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
    const postMetric = await updateMetric();
    return postMetric;
  } catch (err) {
    console.log({ ERR: err });
  }
}

module.exports = {
  createOrUpdateShareMetric,
};
