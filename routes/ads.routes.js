const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload');
const AdvertController = require('../controllers/ads.controller');

router.get('/ads', AdvertController.getAll);
router.get('/ads/:id', AdvertController.getById);
router.get('/ads/search/:searchPhrase', AdvertController.getBySearchPhrase);
router.post('/ads', imageUpload.single('image'), AdvertController.post);
router.put(
	'/ads/:id',
	imageUpload.single('image'),
	AdvertController.updateById
);
router.delete('/ads/:id', AdvertController.deleteById);

module.exports = router;
