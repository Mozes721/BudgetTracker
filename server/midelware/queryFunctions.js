const pool = require('../utils/connections');
const queries = require('../users/queries');

function getBalance(id)
{
    return new Promise(function(resolve, reject) {
        pool.query(queries.getBalance, [id], (error, result) => {
            if (error) {
                return reject(error)
            }
                resolve(result.rows[0].balance);
            })
            pool.end;

    });
}
function updateBalance(ammount, id) {
    pool.query(queries.updateBalance, [ammount, id], (error, result) => {
            if(!error) {
                console.log(result);
            }
        })
    pool.end;
}

function addExpenseOrIncome(balance, title, expense, value, id) {
    pool.query(queries.addExpenseOrIncome, [balance, title, expense, value, id], (error, result) => {
        if(!error) {
            console.log(result);
            }
        })
    pool.end;
}

module.exports = {
    getBalance,
    updateBalance,
    addExpenseOrIncome,
}