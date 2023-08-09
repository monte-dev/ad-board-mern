const express = require('express');
const router = express.Router();

const AdvertController = require('../controllers/ads.controller');

router.get('/ads', AdvertController.getAll);
router.get('/ads/:id', AdvertController.getById);

module.exports = router;
