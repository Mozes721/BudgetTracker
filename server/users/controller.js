const pool = require('../utils/connections');
const queryFunc = require('../midelware/queryFunctions');
const queries = require('./queries');
const bcrypt = require("bcrypt");
pool.connect();


const getUsers = (req, res) => { 
  try {
    pool.query(queries.getUsers, (error, result) => {
      if(!error) {
        res.status(200).json(result.rows);
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
  pool.end;
}

const getUserById = (req, res) => { 
    try {
      const id = parseInt(req.params.id);
      pool.query(queries.getUserById, [id], (error, result) => {
        if(!error) {
            res.status(200).json(result.rows);
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
    pool.end;
  }

  const addUser = (req, res) => {
    const { fullname, email, password } = req.body;
    //check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
          res.send("Email already exists.;")
        }else {
    //add user to db
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            pool.query(queries.addUser, [fullname, email, hash], (error, results) => {
              if (error) throw error;
              res.status(201).send("User Added Succesfully!")
            })
          })
        });
      }
  });}

const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  pool.query(queries.deleteUser, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
        res.send("User does not exists in db");
      }
  });
}

const loginUser = (req, res) => {
  const { fullname, email, password } = req.body;
   pool.query(queries.checkPassword, [email], (error, results) => {
      if (results.rows.length) {
        var user_pw = results.rows[0].password;
        if(bcrypt.compareSync(password, user_pw)) {
          res.status(201).send(`User Logged in  Succesfully with the email of ${email}`)
        } else {
          res.status(401).send("Incorrect email or password provided!")
        }
      }
  });
}

const addExpenseOrIncome = (req, res) => {
    const { title, expense, value, created_on, user_id } = req.body;
    const id = parseInt(req.params.id);
    console.log(id)
    //check if expense or income
    try {
          if (expense) {
            // Get balance
             console.log('expense')
            var balance = queries.getBalance(id)
            
            console.log(balance);
            const subtract = queryFunc.canSubtractFromBalance(id, balance);
            if (subtract) {
              let newBalance = value - balance;
              console.log(newBalance)
              queryFunc.updateBalance(id, newBalance);
              if (created_on) {
                queryFunc.addExpenseOrIncomeWithDate(title, expense, value, created_on, id);
              } else {
                queryFunc.addExpenseOrIncomeWithoutDate(title, expense, value, id);
              }
            }else {
              res.send("You don't have enough money")
            }
          } 
          else {
            console.log('income')
            var balance = queryFunc.getBalance(id);
            console.log(balance);
            let newBalance = value + balance;
            console.log(newBalance)
            queryFunc.updateBalance(id, newBalance);
            if (created_on) {
                queryFunc.addExpenseOrIncomeWithDate(title, expense, value, created_on, id);
              } else {
                queryFunc.addExpenseOrIncomeWithoutDate(title, expense, value, id);
              }
          }
        }
        catch (error) {
        res.status(error.status || 500).send({
        error: {
          status: error.status || 500,
          message: error.message || "Internal Server Error",
        },
      });
    }
}

const shareBudget = (req, res) => {
  const {user_id, budget_id}  = req.body;
  try {
  pool.query(queries.shareBudget, [user_id, budget_id], (error, results) => {
   if(!error) {
      res.send("Budget shared")
        res.status(200).json(result.rows);
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
  pool.end;
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUserById,
    loginUser,
    addExpenseOrIncome,
    shareBudget
};