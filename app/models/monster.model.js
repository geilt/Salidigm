function Monster(){
		this.isAlive = true;
		this.hitpoints = 10;
		this.armorClass = 14;
		this.toHit = 5;
		this.toDamage = 5;
		console.log('Contructing Monster');
}
Monster.prototype.recieveDamage = function(damage){
	this.hitpoints = this.hitpoints - damage;
};
Monster.prototype.doDamage = function(target){
	target.recieveDamage(this.toDamage);
};

function Troll() {
	Troll.super_.call(this); // Call constructor (Monster) or Monster.call(this);
	this.hitpoints = 20;
	this.armorClass = 20;
	console.log('Constructing Troll');
}
function SuperTroll(){
	SuperTroll.super_.call(this); // Call constructor (Monster)
	this.hitpoints = 40;
	this.armorClass = 40;
	console.log('Constructing SuperTroll');
}

require('util').inherits(Troll, Monster); // Merge Prototype
require('util').inherits(SuperTroll, Troll); // Merge Prototype


exports = require('./schemas/monster.schema.js');

exports.createMonster = function(monster){
	var troll = new SuperTroll();
	console.log(troll);
	return troll;
};
exports.attack = function(target){

};
exports.defend = function(damage){

};