const Advert = require('../models/ad.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Advert.find({}));
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const ad = await Advert.findById(req.params.id);
		if (!ad) res.status(404).json({ message: 'Not found' });
		else res.json(ad);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.post = async (req, res) => {
	try {
	} catch (err) {
		res.status(500).json({ message: err });
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
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteById = async (req, res) => {
	try {
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
