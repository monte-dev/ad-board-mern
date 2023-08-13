const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const db = require('./db');
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running...');
});

// connect server to db
db();

//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/ad', adsRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/auth', authRoutes);
// serve files from client side - React App

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
	res.status(404).send({ message: 'Not found...' });
});
