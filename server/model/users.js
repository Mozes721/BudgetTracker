const Sequlize = require('sequelize');
const db = require('../utils/connections')

const Users = db.define('users', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,

    },
    fullname: {
        type: Sequlize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequlize.STRING,
        allowNull: false,
    },
})

module.exports = Users;
