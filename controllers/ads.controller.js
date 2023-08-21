const Ad = require('../models/ad.model');
const fs = require('fs');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
	try {
		const ads = await Ad.find().populate('seller');
		res.json(ads);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const ad = await Ad.findById(req.params.id).populate('seller');
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
		} = sanitize(req.body);

		const fileType = req.file
			? await getImageFileType(req.file)
			: 'unknown';

		if (
			title &&
			content &&
			publishedDate &&
			req.file &&
			['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
			price &&
			location &&
			seller
		) {
			const newAd = new Ad({
				title,
				content,
				publishedDate,
				image: req.file.filename,
				price,
				location,
				seller,
			});
			await newAd.save();
			res.json({ message: 'OK, ad added' });
		} else {
			fs.unlinkSync(`./public/uploads/${req.file.filename}`);
			res.status(400).send({ message: 'Bad request in post' });
		}
	} catch (err) {
		res.status(500).json({ message: 'error', err });
	}
};
exports.getBySearchPhrase = async (req, res) => {
	try {
		const ad = await Ad.find({
			title: { $regex: req.params.searchPhrase, $options: 'i' },
		}).populate('seller');
		res.json(ad);
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
		} = sanitize(req.body);
		const fileType = req.file
			? await getImageFileType(req.file)
			: 'unknown';

		const ad = await Ad.findById(req.params.id);
		if (ad) {
			ad.title = title;
			ad.content = content;
			ad.publishedDate = publishedDate;
			if (
				req.file &&
				['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
			) {
				fs.unlinkSync(
					path.join(__dirname, '../public/uploads/', ad.image)
				);
				ad.image = req.file.filename;
			}
			ad.price = price;
			ad.location = location;
			ad.seller = seller;
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
			fs.unlinkSync(path.join(__dirname, '../public/uploads/', ad.image));
			await Ad.deleteOne({ _id: req.params.id });
		} else {
			res.status(404).json({ message: 'Ad not found...' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
