var Mongoose = require('mongoose');

var MonsterSchema = new Mongoose.Schema({
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

module.exports = Mongoose.model('Monsters', MonsterSchema);