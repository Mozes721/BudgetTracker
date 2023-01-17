const pool = require('../utils/connections');
const queryFunc = require('../midelware/queryFunctions');
const queries = require('./queries');
const bcrypt = require("bcrypt");
const e = require('express');
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
        if (results.rows.length > 0) {
          res.status(error || 409).send({
            error: {
              status: error || 409,
              message: error || "Email already exists.",
            },
          });
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
  pool.query(queries.deleteUser, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
        res.send("User does not exists in db");
      }
  });
}

const loginUser = (req, res) => {
  const { email, password } = req.body;
   pool.query(queries.checkPassword, [email], (error, results) => {
      if (results.rows.length) {
        var user_pw = results.rows[0].password;
        if(bcrypt.compareSync(password, user_pw)) {
          res.status(200).send(`User Logged in  Succesfully with the email of ${email}`)
        } else {
          res.status(400).send("Incorrect email or password provided!")
        }
      }
  });
}

const addExpenseOrIncome =  (req, res) => {
    const { title, expense, value } = req.body;
    const id = parseInt(req.params.id);
    //check if expense or income
    queryFunc.getBalance(id).then(function(rows) {
      if (expense) {
            // Get balance
          const newBalance = rows - value
          if(newBalance >= 0) {
            res.send("You have enough money to make the transaction");
            queryFunc.updateBalance(newBalance, id);
            queryFunc.addExpenseOrIncome(newBalance, title, expense, value, id);
            res.send("Expense has been added");
          }
          else {
                  res.send("You don't have enough money");
                }
      }
        else {
            const newBalance = value + rows;
            queryFunc.updateBalance(newBalance, id);
            queryFunc.addExpenseOrIncome(newBalance, title, expense, value, id);
            res.send("Income has been added");
          }
        
    })
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