const sequelize = require("./utils/connections");

const User = require("./model/users");
const Budget = require("./model/budget");

User.hasMany(Budget);
Budget.hasMany(User);

sequelize
    .sync({force: true})
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

