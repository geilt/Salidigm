function Controller() {
	this.database = null;
	this.library = null;
	this.config = null;
	this.socket = null;
	this.app = null;
	this.utils = null;
}
Controller.prototype.set = function(name, obj) {
	if(this.hasOwnProperty(name)){
		this[name] = obj;
	}
};
Controller.prototype.get = function(name){
	if(this.hasOwnProperty(name)){
		return this[name];
	}
	return null;
};

module.exports = Controller;