var Mongoose = require('mongoose');

var PlayerSchema = new Mongoose.Schema({
	provider: String,
	id: String,
	accessToken: String,
	sessionID: String,
	name: {
		familyName: String,
		givenName: String
	},
	emails: [{value: String}],
	profile: {}
});

module.exports = Mongoose.model('Players', PlayerSchema);