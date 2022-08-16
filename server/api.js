const express = require("express");
const userRoutes = require('./users/routers');
const {errorHandler} = require('./midelware/errorMiddleware');
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
}))

const port = 3000;

app.use(express.json());
app.use(errorHandler);


app.get('/', (req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
  res.send('Home screen')
})

app.use('/api/v1/users', userRoutes);



app.listen(port, () => {
  console.log("app is running");
});