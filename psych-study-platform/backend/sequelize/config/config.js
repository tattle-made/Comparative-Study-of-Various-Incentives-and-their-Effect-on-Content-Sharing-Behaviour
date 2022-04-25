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
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
