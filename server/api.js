const express = require("express");
const client = require('./connections.js')
const cors = require("cors");

const app = express();

app.use(express.json());

client.connect();

app.get("/users", (req, res, next) => {
  try {
    client.query("SELECT * FROM users", (err, result) => {
      if(!err) {
        res.send(result.rows)
      }
    })
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  }
  client.end;
});


app.listen(3001, () => {
  console.log("app is running");
});
