
const client = require("./connections");
const tables = require('../users/queries');

client.query(tables.queryUsers, (err, res) => {
    console.log("User table created");
    console.log(err, res);
})
client.query(tables.queryBudget, (err, res) => {
    console.log("Budget table created");
    console.log(err, res);
})

client.query(tables.queryRelationship, (err, res) => {
    console.log("Relationship table created");
    console.log(err, res);
    client.end();
})