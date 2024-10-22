const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require("dotenv").config();

const Member = require('../models/members');

// Connect to MongoDB
mongoose.connect(
    process.env.MONGODB_URI, 
    {}
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


router.get('/', async (req, res) => {
    try {
      const members = await Member.find();
      res.json(members);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/name/:name', async (req, res) => {
    try {
		const members = await Member.find({ name: req.params.name });
		if (members.length === 0) return res.status(404).json({ message: 'Member not found' });
		res.json(members);
    } catch (err) {
      	res.status(500).json({ message: err.message });
    }
  });

router.post('/', async (req, res) => {
	const member = new Member({
	name: req.body.name,
	age: req.body.age,
	phone: req.body.phone,
	email: req.body.email,
	address: req.body.address,
	membership: req.body.membership
	});

	try {
	const newMember = await member.save();
	res.status(201).json(newMember);
	} catch (err) {
	res.status(400).json({ message: err.message });
	}
});
  
router.patch('/name/:name', async (req, res) => {
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
	
		const updatedMember = await member.save();
		res.json(updatedMember);
	} catch (err) {
	  	res.status(400).json({ message: err.message });
	}
});

router.delete('/', async (req, res) => {
	try {
	  const member = await Member.findOneAndDelete({ name: req.body.name });
	  if (!member) return res.status(404).json({ message: 'Member not found' });
	  res.json({ message: 'Member deleted' });
	} catch (err) {
	  res.status(500).json({ message: err.message });
	}
});

module.exports = router;