const Sequlize = require('sequelize')
const db = require('../utils/connections')

const SharedBudget = db.define( "sharedBudget",
    {},
    { timestamps: false }
  );

module.exports = SharedBudget;