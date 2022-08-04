const express = require("express");
const client = require('./connections.js');
const userRoutes = require('./users/routers');
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home screen')
})

app.use('/api/v1/users', userRoutes);



app.listen(port, () => {
  console.log("app is running");
});