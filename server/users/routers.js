const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/',controller.getUsers);
router.post('/', controller.addUser);
router.get('/:id',controller.getUserById);
router.delete('/:id',controller.deleteUserById);
router.post('/login', controller.loginUser);
module.exports = router;