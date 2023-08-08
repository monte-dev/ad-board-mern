const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const db = require('./db');

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running...');
});

// if (NODE_ENV === 'production')
// 	dbUri = 'mongodb+srv://admin:admin@cluster0.ruxtn9e.mongodb.net/adBoardApp';
const dbUri = 'mongodb://localhost:27017/adBoardApp';
