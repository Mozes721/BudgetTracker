const sequelize = require("./utils/connections");

const Users = require("./model/users");
const Budget = require("./model/budget");
const SharedBudget = require("./model/associations");


Users.hasMany(Budget);
Users.belongsToMany(Budget, { through: SharedBudget });
Budget.belongsToMany(Users, { through: SharedBudget });

sequelize
    .sync({force: true})
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

