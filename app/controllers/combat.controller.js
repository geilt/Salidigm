//Holy shit it works.
module.exports = {
	init: function(){
			console.log('running export with config ' + this.config.mongo.db);
	},
	actions: {
		main: function(req, res){
			//req.session.result = 'Attacker';
			//this.database.models.Monsters.createMonster('test');
			console.log(req.session);
			res.render('combat', {
				title: 'Combat',
				content: req.session.result
			});
		},
		results: function(req, res){
			res.render('combat', {
				title: 'Combat',
				content: 'Result!'
			});	
		}
	},
	websockets: {
		attack: function(data, send){
			//console.log('Attack Websocket', this);
			this.session.session.result = 'Attacked';
			this.session.save(function(){
				console.log(arguments);
			});
			//console.log('Attack Session', this.session);
			send({
				result: this.session
			});
		},
		defend: function(data, send){
			console.log('Defend Websocket');
			this.session.result = 'Defended';
			send({
				result: this.session
			});
		}

	}
};