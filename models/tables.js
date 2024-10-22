const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
	floor: {
		type: Number,
		required: true
	},
	row: {
		type: Number,
		required: true
	},
	column: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	chairs: {
		type: Number,
		required: true
	},
	price: {
		type: Number
	},
	checkIn: {
		type: Date
	},
	checkOut: {
		type: Date
	},
	bookingId: {
		type: String
	},
	memberId: {
		type: String
	},
	memberName: {
		type: String
	}
});

module.exports = mongoose.model('Table', tableSchema);
