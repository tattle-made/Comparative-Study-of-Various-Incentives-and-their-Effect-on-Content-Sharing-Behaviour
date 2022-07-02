const { getRowsFromSpreadsheet } = require("../core/service-sheet");

async function* getUserMetrics(conn, userId) {
  const [rows, fields] = await conn.execute(
    `
      SELECT Users.id as userId, Users.username,
      Metrics.type, Metrics.points,
      StudyPhases.stage,
      Posts.headlineText, Posts.id as postId, Posts.informationType, Posts.postNumber,
      PostMetrics.name, PostMetrics.value, PostMetrics.createdAt
      FROM PostMetrics
      LEFT JOIN Users
      ON PostMetrics.user = Users.id
      LEFT JOIN Posts
      ON PostMetrics.post = Posts.id
      LEFT JOIN Metrics
      ON PostMetrics.user = Metrics.user
      LEFT JOIN StudyPhases
      ON PostMetrics.user = StudyPhases.user
      WHERE StudyPhases.user = "${userId}" AND (StudyPhases.stage IN ("FINISHED","POST_TEST_SURVEY","THANK_YOU") AND StudyPhases.current = TRUE)
      ORDER BY username desc
    `
  );

  yield* rows;
}

async function getFeed(conn, userId) {
  const [rows, fields] = await conn.execute(
    `
      SELECT JunctionPostFeeds.postId,
      Posts.postNumber, Posts.informationType, Posts.headlineText 
      FROM Feeds
      LEFT JOIN JunctionPostFeeds
      ON JunctionPostFeeds.feedId = Feeds.id  
      LEFT JOIN Posts
      ON Posts.id = JunctionPostFeeds.postId
      WHERE Feeds.user = "${userId}"
      ORDER BY JunctionPostFeeds.order ASC
    `
  );
  return rows;
}

module.exports = { getUserMetrics, getFeed };
