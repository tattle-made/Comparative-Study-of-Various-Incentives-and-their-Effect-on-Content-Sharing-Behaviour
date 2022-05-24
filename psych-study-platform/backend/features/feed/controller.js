const {
  Feed,
  Post,
  User,
  StudyPhase,
  sequelize,
} = require("../../sequelize/models");
const { checkAndUpdate } = require("../study-phase/controller");
const { FeedNotFound } = require("./errors");

/**
 * get all posts in a feed that are assigned to a
 * particular user.
 */
async function getFeed(userId) {
  const STUDY_PHASES = {
    TEST_DAY_01: { start: 0, end: 5 },
    TEST_DAY_02: { start: 5, end: 15 },
    TEST_DAY_03: { start: 15, end: 25 },
  };

  try {
    let [feed, studyPhase] = await Promise.all([
      await sequelize.query(`
        SELECT Posts.id, Posts.postNumber, Posts.informationType, Posts.headlineText, Posts.readMoreText, 
        Posts.createdAt, Posts.updatedAt, JunctionPostFeeds.order
        FROM Users
        LEFT JOIN Feeds
        ON Feeds.user = Users.id
        LEFT JOIN JunctionPostFeeds
        ON Feeds.id = JunctionPostFeeds.feedId
        LEFT JOIN Posts
        ON JunctionPostFeeds.postId = Posts.id
        LEFT JOIN Metrics
        ON Metrics.user = Users.id
        WHERE Users.id = "${userId}"
        ORDER BY JunctionPostFeeds.order ASC
      `),
      StudyPhase.getCurrentStage(userId),
    ]);

    if (studyPhase === null) {
      await checkAndUpdate(userId);
      studyPhase = await StudyPhase.getCurrentStage(userId);
    }

    if (
      [
        "UNUSED",
        "CONSENT",
        "ONBOARDING",
        "POST_TEST_SURVEY",
        "FINISHED",
      ].includes(studyPhase.stage)
    ) {
      return {
        type: "PAGE",
        page: studyPhase.stage,
      };
    } else {
      const start = STUDY_PHASES[studyPhase.stage].start;
      const end = STUDY_PHASES[studyPhase.stage].end;
      return {
        type: "POSTS",
        posts: feed[0].slice(start, end),
      };
    }
  } catch (err) {
    console.log(err);
    throw new FeedNotFound();
  }
}

module.exports = {
  getFeed,
};
