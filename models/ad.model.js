const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
	title: { type: String, required: true, minlength: 10, maxlength: 50 },
	content: { type: String, required: true, minlength: 20, maxlength: 1000 },
	publishedDate: { type: String, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	location: { type: String, required: true },
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: false,
	},
});

module.exports = mongoose.model('Ad', adSchema);
