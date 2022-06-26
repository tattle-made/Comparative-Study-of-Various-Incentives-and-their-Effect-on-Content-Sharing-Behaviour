const mysql = require("mysql2/promise");

async function connection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "psych_study_platform_production",
  });
}

module.exports = {
  connection,
};
