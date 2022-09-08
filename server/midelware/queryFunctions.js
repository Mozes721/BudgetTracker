const pool = require('../utils/connections');
const queries = require('../users/queries');

let getBalance = (id) => {
        pool.query(queries.getBalance, [id], (error, result) => {
            if (!error) {
                // res.status(200).json(result.rows[0].balance);
                let balance = result.rows[0].balance;
                console.log("hello from balance");
                console.log(balance)
                return balance;
                
            }
            })
            pool.end;
        }

let canSubtractFromBalance = (balance, value) => {

        let newBalance = balance - value
        console.log(newBalance)
        if (newBalance < 0) {

             return false
        } 
        else 
        {
            return true
    }
}
function subtractFromBalance(id, ammount) {
    pool.query(queries.updateBalance, [ammount, id], (error, result) => {
                if(!error) {
                    return result
                }
            })
            pool.end;
        }


function updateBalance(id, ammount) {
    pool.query(queries.updateBalance, [id, ammount], (error, result) => {
            if(!error) {
                console.log(result);
            }
        })
    pool.end;
}
function addExpenseOrIncomeWithDate(title, expense, created_on, id) {
    pool.query(queries.addExpenseOrIncome, [title, expense, created_on, id], (error, result) => {
        if(!error) {
            console.log(result);
            }
        })
    pool.end;
}
function addExpenseOrIncomeWithoutDate(title, expense, created_on, id) {
    pool.query(queries.addExpenseOrIncome, [title, expense, created_on, id], (error, result) => {
        if(!error) {
            console.log(result);
            }
        })
    pool.end;
}

module.exports = {
    getBalance,
    canSubtractFromBalance,
    subtractFromBalance,
    updateBalance,
    addExpenseOrIncomeWithDate,
    addExpenseOrIncomeWithoutDate,
}