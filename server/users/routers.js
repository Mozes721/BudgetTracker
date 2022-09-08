const { Router } = require('express');
const controller = require('../users/controller');
const router = Router();

router.get('/',controller.getUsers);
router.post('/', controller.addUser);
router.get('/:id',controller.getUserById);
router.delete('/:id',controller.deleteUserById);
router.post('/login', controller.loginUser);


router.post('/expense/:id',controller.addExpenseOrIncome);
router.post('/shared-expense', controller.shareBudget);

module.exports = router;