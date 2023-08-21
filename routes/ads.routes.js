const express = require('express');
const router = express.Router();

const AdvertController = require('../controllers/ads.controller');

router.get('/ads', AdvertController.getAll);
router.get('/ads/:id', AdvertController.getById);
router.get('/ads/search/:searchPhrase', AdvertController.getBySearchPhrase);
router.post('/ads', AdvertController.post);
router.put('/ads/:id', AdvertController.updateById);
router.delete('/ads/:id', AdvertController.deleteById);

module.exports = router;
