var Troll = require('./test.js');
function SuperTroll(){
	Troll.call(this); // Call constructor (Monster)
	this.hitpoints = 40;
	this.armorClass = 40;
	console.log('Constructing SuperTroll');
}

require('util').inherits(Troll, SuperTroll);

var myTroll = new SuperTroll();