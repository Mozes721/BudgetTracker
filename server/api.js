const express = require("express");
const client = require('./connections.js');
const userRoutes = require('./users/routers');
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());


app.get('/', (req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Credentials", true);
  next();
  res.send('Home screen')
})

app.use('/api/v1/users', userRoutes);



app.listen(port, () => {
  console.log("app is running");
});