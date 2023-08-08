const mongoose = require('mongoose');

const connectToDB = () => {
	const dbUri = 'mongodb://localhost:27017/adBoardApp';

	// connect to DB
	mongoose.connect(dbUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const db = mongoose.connection;

	// handle success
	db.once('open', () => {
		console.log('Connected to the database');
	});

	// handle error
	db.on('error', (err) => console.log('Error ' + err));
};

module.exports = connectToDB;
