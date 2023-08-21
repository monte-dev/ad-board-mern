const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
	try {
		const { login, password, phoneNumber } = req.body;
		const fileType = req.file
			? await getImageFileType(req.file)
			: 'unknown';

		if (
			login &&
			typeof login === 'string' &&
			password &&
			typeof password === 'string' &&
			req.file &&
			['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
			phoneNumber &&
			typeof phoneNumber === 'string'
		) {
			const userWithLogin = await User.findOne({ login });
			if (userWithLogin) {
				fs.unlinkSync(`./public/uploads/${req.file.filename}`);

				return res.status(409).send({
					message: 'User with this login already exists',
				});
			}
			const user = await User.create({
				login,
				password: await bcrypt.hash(password, 10),
				phoneNumber,
				avatar: req.file.filename,
			});
			res.status(201).send({ message: 'User created ' + user.login });
		} else {
			console.log('Bad request data:', req.body);
			res.status(400).send({ message: 'Bad request' });
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { login, password } = req.body;
		if (
			login &&
			typeof login === 'string' &&
			password &&
			typeof password === 'string'
		) {
			const user = await User.findOne({ login });

			if (!user) {
				res.status(400).send('Incorrect credentials');
			} else {
				if (bcrypt.compareSync(password, user.password)) {
					req.session.user = {
						id: user._id,
						login: user.login,
					};
					res.status(200).send({ message: 'Login Successful' });
				} else {
					res.status(400).send('Incorrect credentials');
				}
			}
		} else {
			res.status(400).send({ message: 'Bad request' });
		}
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.getUser = async (req, res) => {
	res.send('logged in');
};

exports.logout = async (req, res) => {
	req.session.destroy();
};
