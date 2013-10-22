var config = require('../config'),
	utils = require('./utils'),
	path = require('path'),
	Express = require('express'),
	io = require('socket.io'),
	stylus = require('stylus'),
	nib = require('nib'),
	database = require('./database'),
	router = require('./router.js');

var app = new Express();

/**
 * Setup Nib
 */
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

app.configure(function() {
	app.use(function(req, res, next) {
		//Dont have to pass the database around, it is now in every request in Express.
		req._db = database;
		next();
	});

	app.use(Express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(Express.bodyParser());
	app.set('views', path.resolve(__dirname, '../app/views'));
	app.set('view engine', 'jade');
	app.use(stylus.middleware({
		src: path.resolve(__dirname, '../public'),
		compile: compile
	}));
	app.use(Express.static(path.resolve(__dirname, '../public')));
	app.use(Express.cookieParser());
	app.use(Express.bodyParser());
	app.use(Express.cookieSession({
		secret: config.server.secret,
		maxAge: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), //2 week
	}));
	app.use(app.router);
});


/**
 * Load the Controllers
 * @type {[type]}
 */
var Controllers = utils.loadDirectory(path.resolve(__dirname, '../app/controllers'), '.controller.js');

app.get('/', Controllers.combat.main);

for(var controller in Controllers){
	app.get('/' + controller, Controllers.combat.main);
	for(var action in Controllers[controller]){
		if(action != 'main'){
			app.get('/' + index + '/' + action, Controllers[controller][action]);
		}
	}
}

app.listen(config.server.port);
console.log('Listening on port ' + config.server.port);
//io.listen(app.listen(config.server.port));