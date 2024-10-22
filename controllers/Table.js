const mongoose = require('mongoose');
require("dotenv").config();

const Table = require('../models/tables');

// Connect to MongoDB
mongoose.connect(
	process.env.MONGODB_URI,
	{}
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database OK - TableController'));

exports.getTables = async (req, res) => {
	try {
		const table = await Table.find();
		res.json(table);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getTableByNumber = async (req, res) => {
	try {
		const table = await Table.find({ number: req.params.number });
		if (table.length === 0) return res.status(404).json({ message: 'Table not found' });
		res.json(Table);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.postTable = async (req, res) => {
	const table = new Table({
		floor: req.body.floor,
		number: req.body.number,
		status: req.body.status,
		chairs: req.body.chairs,
		price: req.body.price,
		checkIn: req.body.checkIn,
		checkOut: req.body.checkOut,
		bookingId: req.body.bookingId,
		memberId: req.body.memberId,
		memberName: req.body.memberName
	});

	try {
		const newTable = await table.save();
		res.status(201).json(newTable);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

exports.updateTableByNumber = async (req, res) => {
	try {
		const table = await Table.findOne({ number: req.params.number });
		if (!table) return res.status(404).json({ message: 'Table not found' });

		if (req.body.floor != null) {
			table.floor = req.body.floor;
		}
		if (req.body.number != null) {
			table.number = req.body.number;
		}
		if (req.body.status != null) {
			table.status = req.body.status;
		}
		if (req.body.chairs != null) {
			table.chairs = req.body.chairs;
		}
		if (req.body.price != null) {
			table.price = req.body.price;
		}
		if (req.body.checkIn != null) {
			table.checkIn = req.body.checkIn;
		}
		if (req.body.checkOut != null) {
			table.checkOut = req.body.checkOut;
		}
		if (req.body.bookingId != null) {
			table.bookingId = req.body.bookingId;
		}
		if (req.body.memberId != null) {
			table.memberId = req.body.memberId;
		}
		if (req.body.memberName != null) {
			table.memberName = req.body.memberName;
		}

		const updatedTable = await table.save();
		res.json(updatedTable);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

exports.deleteTableByNumber = async (req, res) => {
	try {
		const table = await Table.findOneAndDelete({ number: req.body.number });
		if (!table) return res.status(404).json({ message: 'Table not found' });
		res.json({ message: 'Table deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}