const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');

router.get('/user', UserController.getUser);
router.get('/login', UserController.login);
router.get('/register', UserController.register);

module.exports = router;
