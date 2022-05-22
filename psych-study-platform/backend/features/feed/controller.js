const { Feed, Post, User, StudyPhase } = require("../../sequelize/models");
const { checkAndUpdate } = require("../study-phase/controller");
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
    let [feed, studyPhase] = await Promise.all([
      Feed.findAll({
        where: {
          user: userId,
        },
      }),
      StudyPhase.getCurrentStage(userId),
    ]);

    if (studyPhase === null) {
      await checkAndUpdate(userId);
      studyPhase = await StudyPhase.getCurrentStage(userId);
    }

    if (
      ["UNUSED", "ONBOARDING", "POST_TEST_SURVEY", "FINISHED"].includes(
        studyPhase.stage
      )
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
      // const events = await Events.findAll({
      //   where:{
      //     postId :
      //   }
      // })
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
