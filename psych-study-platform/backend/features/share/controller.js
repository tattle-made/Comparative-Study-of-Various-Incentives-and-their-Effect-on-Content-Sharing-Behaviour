const {
  StudyPhase,
  Post,
  PostMetric,
  Metric,
} = require("../../sequelize/models");
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
    const [postRes, metricRes, studyPhaseRes] = await Promise.all([
      Post.findOne({ where: { id: postId } }),
      Metric.findOne({ where: { user: userId } }),
      StudyPhase.findOne({ where: { user: userId, current: true } }),
    ]);
    const { updateMetric } = await shareMetricManagerFactory(
      userId,
      postRes,
      metricRes,
      studyPhaseRes
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
