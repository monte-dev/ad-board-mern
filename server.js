const express = require('express');
const cors = require('cors');
const path = require('path');
const formidable = require('express-formidable');
const mongoose = require('mongoose');
const db = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

const app = express();
app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running...');
});

// connect server to db
db();

//middleware

if (process.env.NODE_ENV !== 'production') {
	app.use(
		cors({
			origin: ['http://localhost:3000'],
			credentials: true,
		})
	);
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: `${process.env.DB_SECRET}`,
		store: MongoStore.create(mongoose.connection),
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV == 'production',
		},
	})
);

app.use('/api', adsRoutes);
app.use('/api', usersRoutes);
app.use('/api/auth', authRoutes);
// serve files from client side - React App

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/uploads/')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
	res.status(404).send({ message: 'Not found...' });
});
