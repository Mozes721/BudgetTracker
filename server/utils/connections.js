const Sequelize = require("sequelize");
// Example PostgreSQL connect to DB
const sequelize = new Sequelize('postgres://postgres:root@:5432/budget');
module.exports = sequelize;

