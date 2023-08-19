const Ad = require('../models/ad.model');

exports.getAll = async (req, res) => {
	try {
		const ads = await Ad.find().populate({
			path: 'seller',
			select: ['login', 'avatar', 'phoneNumber'],
		});
		res.json(ads);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const ad = await Ad.findById(req.params.id);
		if (!ad) res.status(404).json({ message: 'Not found' });
		else res.json(ad);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.post = async (req, res) => {
	try {
		const {
			title,
			content,
			publishedDate,
			image,
			price,
			location,
			seller,
		} = req.body;
		if (
			title &&
			content &&
			publishedDate &&
			image &&
			price &&
			location &&
			seller
		) {
			const newAd = new Ad({
				title,
				content,
				publishedDate,
				image,
				price,
				location,
				seller,
			});
			await newAd.save();
			res.json({ message: 'OK, ad added' });
		} else {
			res.status(400).send({ message: 'Bad request in post' });
		}
	} catch (err) {
		res.status(500).json({ message: 'error', err });
	}
};
exports.getBySearchPhrase = async (req, res) => {
	try {
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
exports.updateById = async (req, res) => {
	try {
		const {
			title,
			content,
			publishedDate,
			image,
			price,
			location,
			seller,
		} = req.body;
		const ad = await Ad.findById(req.params.id);
		if (ad) {
			(ad.title = title),
				(ad.content = content),
				(ad.publishedDate = publishedDate),
				(ad.image = image),
				(ad.price = price),
				(ad.location = location),
				(ad.seller = seller);
			const modifiedAd = await ad.save();
			res.json(modifiedAd);
		} else {
			res.status(404).json({ message: 'Ad not found...' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteById = async (req, res) => {
	try {
		const ad = await Ad.findById(req.params.id);
		if (ad) {
			await Ad.deleteOne({ _id: req.params.id });
		} else {
			res.status(404).json({ message: 'Ad not found...' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
