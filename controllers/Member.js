const mongoose = require('mongoose');
require("dotenv").config();
const bcrypt = require('bcryptjs');

const Member = require('../models/members');

// Connect to MongoDB
mongoose.connect(
	process.env.MONGODB_URI,
	{}
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database OK - MemberController'));

exports.getMembers = async (req, res) => {
	try {
		const members = await Member.find();
		res.json(members);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getMemberByName = async (req, res) => {
	try {
		const members = await Member.find({ name: req.params.name });
		if (members.length === 0) return res.status(404).json({ message: 'Member not found' });
		res.json(members);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.postMembers = async (req, res) => {
	let pass = '';
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			pass = hash;
		});
	});
	const member = new Member({
		name: req.body.name,
		age: req.body.age,
		phone: req.body.phone,
		email: req.body.email,
		address: req.body.address,
		membership: req.body.membership,
		username: req.body.username,
		password: pass
	});

	try {
		const newMember = await member.save();
		res.status(201).json(newMember);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

exports.updateMemberByName = async (req, res) => {
	try {
		const member = await Member.findOne({ name: req.params.name });
		if (!member) return res.status(404).json({ message: 'Member not found' });

		if (req.body.name != null) {
			member.name = req.body.name;
		}
		if (req.body.age != null) {
			member.age = req.body.age;
		}
		if (req.body.phone != null) {
			member.phone = req.body.phone;
		}
		if (req.body.email != null) {
			member.email = req.body.email;
		}
		if (req.body.address != null) {
			member.address = req.body.address;
		}
		if (req.body.membership != null) {
			member.membership = req.body.membership;
			if (req.body.membership == 'silver') {
				let date = new Date();
				date.setDate(date.getDate() + 30);
				member.membershipExpiry = date.toDateString();
			}
			if (req.body.membership == 'gold') {
				let date = new Date();
				date.setDate(date.getDate() + 60);
				member.membershipExpiry = date.toDateString();
			}
			if (req.body.membership == 'platinum') {
				let date = new Date();
				date.setDate(date.getDate() + 90);
				member.membershipExpiry = date.toDateString();
			}
		}
		if (req.body.username != null) {
			member.username = req.body.username;
		}
		if (req.body.password != null) {
			try {
				const salt = await bcrypt.genSalt(10);
				const hash = await bcrypt.hash(req.body.password, salt);
				member.password = hash;
			} catch (error) {
				console.error('Error hashing password:', error);
				return res.status(500).json({ message: 'Internal server error' });
			}
		}
		try {
			const updatedMember = await member.save();
			res.json(updatedMember);
		} catch (error) {
			console.error('Error saving member:', error);
			res.status(500).json({ message: 'Error saving member' });
		}
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

exports.deleteMemberByName = async (req, res) => {
	try {
		const member = await Member.findOneAndDelete({ name: req.body.name });
		if (!member) return res.status(404).json({ message: 'Member not found' });
		res.json({ message: 'Member deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}