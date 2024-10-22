const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	phone: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	membership: {
		type: String
	},
	membershipExpiry: {
		type: Date
	}
});

module.exports = mongoose.model('Member', memberSchema);
