const {Pool, Client} = require('pg')

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "budget"
})

module.exports = pool