function Troll() {
	//Troll.super_.call(this); // Call constructor (Monster) or Monster.call(this);
	this.hitpoints = 20;
	this.armorClass = 20;
	console.log('Constructing Troll');
}

module.exports = Troll;