module.exports = {
  development: {
    username: "tattle",
    password: "tattle_pw",
    database: "incentives_db",
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "tattle",
    password: "tattle_pw",
    database: "incentives_db",
    host: "localhost",
    dialect: "mysql",
  },
  staging: {
    username: process.env.DB_USERNAME_STAGING,
    password: process.env.DB_PASSWORD_STAGING,
    database: "psych_study_platform_staging",
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "psych_study_platform_production",
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
