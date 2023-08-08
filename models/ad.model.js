const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
	title: { type: String, required: true, minlength: 10, maxlength: 50 },
	content: { type: String, required: true, minlength: 20, maxlength: 1000 },
	publishedDate: { type: Date, default: Date.now, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	location: { type: String, required: true },
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

module.exports = mongoose.model('Advert', advertSchema);
