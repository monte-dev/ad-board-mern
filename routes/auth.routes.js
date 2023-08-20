const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authMiddleware, authController.getUser);
router.delete('/logout', authMiddleware, authController.logout);

module.exports = router;
