async function getUserStatusAndMetrics(connection, userId) {
  const [rows, fields] = await connection.execute(
    `
      SELECT Users.id as userId, Users.username, 
      StudyPhases.stage, 
      Metrics.type, Metrics.points
      FROM StudyPhases
      LEFT JOIN Metrics
      ON StudyPhases.user  = Metrics.user  
      LEFT JOIN Users
      ON StudyPhases.user = Users.id 
      WHERE StudyPhases.user  = "${userId}" and StudyPhases.current = true
    `
  );

  if (rows != undefined && rows.length == 1) {
    const row = rows[0];
    return row;
  }
}

module.exports = { getUserStatusAndMetrics };
