const fs = require('fs');
const Ad = require('../models/ad.model');
const sanitize = require('mongo-sanitize');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
	try {
		const ads = await Ad.find().populate('title');
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
		const { title, content, price, location } = req.body;
		console.log('body', req.body);

		const currentDate = new Date();
		const formattedDate = currentDate.toLocaleDateString('en-US');
		const seller = req.session.userId;
		const fileType = req.file
			? await getImageFileType(req.file)
			: 'unknown';

		console.log(fileType);
		if (
			title &&
			content &&
			req.file &&
			['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
			price &&
			location &&
			seller
		) {
			const newAd = new Ad({
				title: title,
				content: content,
				publishedDate: formattedDate,
				image: req.file.filename,
				price: price,
				location: location,
				seller: seller,
			});
			console.log('seller', seller);
			console.log('req.body', req.body);
			await newAd.save();
			res.json({ message: 'OK, ad added' });
		} else {
			fs.unlinkSync(`./public/uploads/${req.file.filename}`);
			res.status(400).send({ message: 'Bad request in post' });
		}
	} catch (err) {
		console.error(err);
		console.log('req.body', req.body);

		res.status(500).json({ message: 'Internal Server Error' });
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
			// fs.unlinkSync(path.join(__dirname, '../public/uploads/', ad.image));
			await Ad.deleteOne({ _id: req.params.id });
			res.json(ad);
		} else {
			res.status(404).json({ message: 'Ad not found...' });
		}
	} catch (err) {
		console.log('error');
		res.status(500).json({ message: err });
	}
};
