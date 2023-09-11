const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = () => {
	let dbUri = '';

	const NODE_ENV = process.env.NODE_ENV;

	if (NODE_ENV === 'production')
		dbUri = `mongodb+srv://admin:${process.env.DB_PASS}@${process.env.DB_CONNECTION}`;
	else dbUri = 'mongodb://localhost:27017/adBoardApp';

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
