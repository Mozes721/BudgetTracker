const sequelize = require("./utils/connections");

const Users = require("./model/users");
const Budget = require("./model/budget");

sequelize
    .sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

    