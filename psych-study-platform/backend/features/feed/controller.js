const {
  Feed,
  Post,
  User,
  StudyPhase,
  sequelize,
} = require("../../sequelize/models");
const { checkAndUpdate } = require("../study-phase/controller");
const { UnableToUpdateStudyPhase } = require("../study-phase/error");
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
    let studyPhase = await StudyPhase.getCurrentStage(userId);

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
      try {
        await checkAndUpdate(userId);
        studyPhase = await StudyPhase.getCurrentStage(userId);
      } catch (err) {
        if (err instanceof UnableToUpdateStudyPhase) {
          console.log("ignore");
        }
      }
      const start = STUDY_PHASES[studyPhase.stage].start;
      const end = STUDY_PHASES[studyPhase.stage].end;
      let feed = await sequelize.query(`     
          SELECT Posts.id, Posts.postNumber, Posts.informationType, Posts.headlineText, Posts.readMoreText, 
          Posts.createdAt, Posts.updatedAt, JunctionPostFeeds.order, PostMetrics.name, PostMetrics.value
          FROM Users
          LEFT JOIN Feeds
          ON Feeds.user = Users.id
          LEFT JOIN JunctionPostFeeds
          ON Feeds.id = JunctionPostFeeds.feedId
          LEFT JOIN Posts
          ON JunctionPostFeeds.postId = Posts.id
          LEFT JOIN Metrics
          ON Metrics.user = Users.id
          LEFT JOIN PostMetrics
          ON PostMetrics.user = Users.id AND PostMetrics.post = Posts.id
          WHERE Users.id = "${userId}" AND (JunctionPostFeeds.order >= ${start} AND JunctionPostFeeds.order<${end})
          ORDER BY JunctionPostFeeds.order ASC
        `);
      let posts = feed[0].reduce((prev, curr) => {
        let index = curr.order - start;
        if (!prev[index]) {
          prev[index] = {};
          prev[index]["metrics"] = {};
          prev[index]["id"] = curr.id;
          prev[index]["postNumber"] = curr.postNumber;
          prev[index]["informationType"] = curr.informationType;
          prev[index]["headlineText"] = curr.headlineText;
          prev[index]["readMoreText"] = curr.readMoreText;
        }

        prev[index]["metrics"][curr.name] = curr.value;
        return prev;
      }, []);
      return {
        type: "POSTS",
        posts,
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
