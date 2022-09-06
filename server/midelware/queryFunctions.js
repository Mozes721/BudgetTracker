const pool = require('../utils/connections');
const queries = require('../users/queries');

function getBalance(id) {
        pool.query(queries.getBalance, [id], (error, result) => {
            if(!error) {
                console.log(result)
                    return result.rows[0];
                }
            })
            pool.end;
        }

function canSubtractFromBalance(id, ammount) {
        let value = getBalance(id)
        let newBalance = value - ammount
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