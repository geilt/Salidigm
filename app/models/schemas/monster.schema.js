var Mongoose = require('mongoose');

var MonsterSchema = new Mongoose.Schema({
	name: String,
	alias: String,
	stats: {
		defense: {
			armorClass: Number,
			toDodge: Number,
			toParry: Number,
			toRiposte: Number,
			toBlock: Number
		},
		offense: {
			toHit: Number,
			toDamage: Number,
		}
	},
	body: {
		composition: { type: String, default: 'Carbon' },

		heads: { type: Number, default: 1 },
		horns: { type: Number, default: 0 },
		eyes: { type: Number, default: 2 },
		mouths: { type: Number, default: 1 },
		teeth: { type: Number, default: 32 },
		ears: { type: Number, default: 1 },
		noses: { type: Number, default: 1 },
		nostrils: { type: Number, default: 2 },

		torsos: { type: Number, default: 1 },
		
		wings: { type: Number, default: 0 },
		tentacles: { type: Number, default: 0 },

		arms: { type: Number, default: 2 },
		hands: { type: Number, default: 2 },
		fingers: { type: Number, default: 10 },
		fingernails: { type: Number, default: 10 },
		fingerclaws: { type: Boolean, default: false },
		
		legs: { type: Number, default: 2 },
		feet: { type: Number, default: 2 },
		toes: { type: Number, default: 10 },
		toenails: { type: Number, default: 10 },
		toeclaws: { type: Boolean, default: false },

		phallus: { type: Number, default: 1 }
	}
});

module.exports = Mongoose.model('Monsters', MonsterSchema);