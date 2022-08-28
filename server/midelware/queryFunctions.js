const pool = require('../utils/connections');
const queries = require('../users/queries');

function getBalance(id) {
            pool.query(queries.getBalance, [id], (error, result) => {
                if(!error) {
                    return result;
        }
    })
    pool.end;
}

function subtractFromBalance(id) {
            
}

function addExpenseOrIncome(id) {
            
}