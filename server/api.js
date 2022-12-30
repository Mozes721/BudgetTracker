const express = require("express");
const userRoutes = require('./users/routers');
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
}))

const port = 5000;

app.use(express.json());

app.get('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", true);
  res.header("Access-Control-Allow-Credentials", true);
  // next();
  res.send('Home screen')
})

app.use('/api/v1/users', userRoutes);


app.listen(port, () => {
  console.log("app is running");
  return;
});