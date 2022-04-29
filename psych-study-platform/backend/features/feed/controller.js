const { Feed, Post, User, StudyPhase } = require("../../sequelize/models");
const { FeedNotFound } = require("./errors");

/**
 * get all posts in a feed that are assigned to a
 * particular user.
 */
async function getFeed(userId) {
  const STUDY_PHASES = {
    TEST_DAY_01: { offset: 0, limit: 5 },
    TEST_DAY_02: { offset: 5, limit: 10 },
    TEST_DAY_03: { offset: 15, limit: 10 },
  };

  try {
    const [feed, studyPhase] = await Promise.all([
      Feed.findAll({
        where: {
          user: userId,
        },
      }),
      StudyPhase.findOne({
        where: {
          user: userId,
        },
      }),
    ]);

    if (
      [
        "UNUSED",
        "PRETEST",
        "ONBOARDING",
        "POST_TEST_SURVEY",
        "CRISIS",
        "BLOCKED",
      ].includes(studyPhase.stage)
    ) {
      return {
        type: "PAGE",
        page: studyPhase.stage,
      };
    } else {
      const posts = await feed[0].getPosts({
        ...STUDY_PHASES[studyPhase.stage],
        joinTableAttributes: [],
      });
      return {
        type: "POSTS",
        posts: posts.map((post) => post.toJSON()),
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
