const pool = require('../connections');
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

const getUsersById = (req, res) => { 
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
        }
    //add user to db
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        pool.query(queries.addUser, [fullname, email, hash], (error, results) => {
          if (error) throw error;
          res.status(201).send("User Added Succesfully!")
        })
      })
    })
  });
}

module.exports = {
    getUsers,
    getUsersById,
    addUser,
};