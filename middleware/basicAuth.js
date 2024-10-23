const mongoose = require('mongoose');
const Member = require('../models/members');
require("dotenv").config();
const bcrypt = require('bcryptjs');

mongoose.connect(
	process.env.MONGODB_URI,
	{}
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database OK - jwtBasicAuth'));

const basicAuth = async (req, res, next) => {
	// Get the Authorization header
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Basic ')) {
		return res.status(401).json({ message: 'Missing or invalid Authorization header' });
	}

	// Decode Base64 string (e.g., Basic YWRtaW46cGFzc3dvcmQ=)
	const base64Credentials = authHeader.split(' ')[1];
	const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

	// Split the username and password
	const [username, pass] = credentials.split(':');

	const member = await Member.findOne({ username: username });

	let memberPass = '';

	if (member) {
		memberPass = member.password;
	} else {
		console.log('Member not found');
	}

	const validUsername = username;
	const hash = memberPass;

	// Check if credentials are valid
	if (username === validUsername) {
		bcrypt.compare(pass, hash)
			.then((isMatch) => {
				if (isMatch) {
					// Passwords match
					next(); // Allow access if credentials are valid
				} else {
					// Password is incorrect
					res.status(401).json({ message: 'Invalid credentials' });
				}
			})
			.catch((error) => {
				// Handle any errors that may occur during comparison
				console.error('Error comparing passwords:', error);
				res.status(500).json({ message: 'Internal server error' });
			});
	} else {
		res.status(401).json({ message: 'Invalid credentials' });
	}
};

module.exports = basicAuth;