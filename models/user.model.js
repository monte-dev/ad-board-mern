const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	login: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	avatar: { type: String, required: true },
	phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
