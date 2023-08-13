const User = require('../models/user.model');

exports.getUser = async (req, res) => {
	try {
		res.json(await User.find({}));
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.login = async (req, res) => {
	try {
		const ad = await User.findById(req.params.id);
		if (!ad) res.status(404).json({ message: 'Not found' });
		else res.json(ad);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.register = async (req, res) => {
	try {
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
