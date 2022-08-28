const { Router } = require('express');
const controller = require('../users/controller');
const router = Router();

router.get('/',controller.getUsers);
router.post('/', controller.addUser);
router.get('/:id',controller.getUserById);
router.delete('/:id',controller.deleteUserById);
router.post('/login', controller.loginUser);

router.get('/budget/:id', controller.getUserBudget);
router.post('/expense',controller.addExpense);
router.post('/income',controller.addExpense);
router.post('/balance',controller.checkBalance);

module.exports = router;