const pool = require('../utils/connections');
const queries = require('./queries');
const bcrypt = require("bcrypt");
const Users = require('../model/users');
// pool.connect();


const getUsers = (req, res) => { 
  try {
    Users.findAll()
    .then(data => {
      res.send(data);
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
    console.log(fullname, email, password)
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
    })
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


module.exports = {
    getUsers,
    getUsersById,
    addUser,
    loginUser,
};