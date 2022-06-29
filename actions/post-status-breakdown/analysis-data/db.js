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

module.exports = { getUserMetrics };
