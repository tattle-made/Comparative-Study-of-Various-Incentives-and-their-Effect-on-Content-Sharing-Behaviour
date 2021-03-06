const {
  InvalidSharePostPayload,
  InvalidStudyTypePayload,
} = require("./errors");
const { Metric, sequelize } = require("../../sequelize/models");

function shareMetricManagerFactory(userId, post, metric, studyPhase) {
  async function updateMonetaryMetric(post, metric, t) {
    const { informationType } = post;

    const incrementSlab = {
      TRUE: 10,
      PLAUSIBLE: 10,
      FALSE: -4,
      IMPLAUSIBLE: -4,
      WHOLESOME: 0,
    };

    const increment = incrementSlab[informationType];

    if (increment === undefined) throw new Error("Undefined Information Type");

    return Metric.upsert(
      { id: metric.id, points: metric.points + increment },
      { transaction: t }
    );
  }

  async function updateVanityMetric(post, metric, t) {
    const { informationType } = post;

    const incrementSlab = {
      TRUE: 400,
      PLAUSIBLE: 400,
      FALSE: -40,
      IMPLAUSIBLE: -40,
      WHOLESOME: 0,
    };

    const increment = incrementSlab[informationType];

    if (increment === undefined) throw new Error("Undefined Information Type");

    return Metric.upsert(
      { id: metric.id, points: metric.points + increment },
      { transaction: t }
    );
  }

  async function updateMetric() {
    const { type: metricType } = metric;
    try {
      let fullUserMetric;
      if (studyPhase.stage === "TEST_DAY_01") {
        fullUserMetric = await Metric.findOne({
          where: {
            user: userId,
          },
        });
      } else {
        const { userMetric } = await sequelize.transaction(async (t) => {
          let userMetric;
          if (metricType === "MONETARY")
            userMetric = await updateMonetaryMetric(post, metric, t);
          else if (metricType === "VANITY")
            userMetric = await updateVanityMetric(post, metric, t);
          else throw new InvalidStudyTypePayload();

          return { userMetric };
        });
        fullUserMetric = await Metric.findOne({
          where: {
            id: userMetric[0].id,
          },
        });
      }
      return { userMetric: fullUserMetric };
    } catch (err) {
      throw new InvalidSharePostPayload();
    }
  }
  return {
    updateMetric,
  };
}

module.exports = {
  shareMetricManagerFactory,
};
