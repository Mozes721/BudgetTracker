const Sequelize = require("sequelize");
// Example PostgreSQL connect to DB
const sequelize = new Sequelize('postgres://[user]:[pass]@postgres:5432/db');
module.exports = sequelize;

