exports.main = function(req, res){
	console.log(req._db.models.Monsters);
	req._db.models.Monsters.createMonster('test');
	res.send('Test');
	/*
	res.render('index', {
		title: style[0].forms[0].name,
		moves: style[0].forms[0].moves
	});	
	*/
};