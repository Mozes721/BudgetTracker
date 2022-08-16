const Sequlize= require('sequelize')
const DataTypes = require('sequelize')
const db = require('../utils/connections')

const Budget = db.define('budget', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true, 
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
    createdAt: {
      type: Sequlize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequlize.DATE,
      allowNull: false,
    }
})

module.exports = Budget;

