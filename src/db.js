const { Sequelize } = require("sequelize");
const env = process.env;

module.exports = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  dialect: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
});
