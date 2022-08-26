var queryUsers = "CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, FULLNAME VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);"
var queryBudget = "CREATE TABLE IF NOT EXISTS budget(budget_id SERIAL PRIMARY KEY, balance FLOAT DEFAULT 0, title VARCHAR(255),expense BOOLEAN DEFAULT TRUE,value FLOAT NOT NULL, created_on DATE NOT NULL DEFAULT CURRENT_DATE, user_id integer REFERENCES users (user_id));"
var queryRelationship = "CREATE TABLE IF NOT EXISTS associations(user_id INT NOT NULL, budget_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (budget_id) REFERENCES budget(budget_id), UNIQUE (user_id, budget_id));"

const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const checkPassword = "SELECT password from users where email = $1";
const addUser = "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3)";

module.exports = {
    queryUsers,
    queryBudget,
    queryRelationship,
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    checkPassword,
}