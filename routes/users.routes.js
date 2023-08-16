const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

router.get('/user', userController.getUser);

module.exports = router;
