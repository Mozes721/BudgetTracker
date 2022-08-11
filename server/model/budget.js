const Sequlize= require('sequelize');
const DataTypes = require('sequelize');
const db = require('../utils/connections')

const Budget = db.define('budget', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
    },

    balance: {
        type: Sequlize.FLOAT,
        default: 0,
    },
    title: {
        type: Sequlize.STRING,
        allowNull: false,
    },
    expense: {
        type: Sequlize.BOOLEAN,
        allowNull: false,
    },
    value: {
        type: Sequlize.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
})

module.exports = Budget;

