//Holy shit it works.
module.exports = {
	init: function(){
			console.log('running export with config ' + this.config.mongo.db);
	},
	actions: {
		main: function(req, res){
			this.database.models.Monsters.createMonster('test');
			res.render('combat', {
				title: 'Combat',
				content: 'Test content'
			});
		},
	},
	websockets: {
		attack: function(data, send){
			send({
				result: 'yup'
			});
		}
	}
};