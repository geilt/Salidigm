
var config = require('../config'),
	utils = require('./utils'),
	Express = require('express'),
	io = require('socket.io'),
	stylus = require('stylus'),
	nib = require('nib'),
	database = require('./database'),
	router = require('./router.js'),
	Passport = require('passport'),
	MongoStore = require('connect-mongo')(Express);

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
	});

	app.use(Express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(Express.bodyParser());
	app.set('views', __dirname + 'app/views');
	app.set('view engine', 'jade');
	app.use(stylus.middleware({
		src: __dirname + '/public',
		compile: compile
	}));
	app.use(Express.static(__dirname + '/public'));
	app.use(Express.cookieParser());
	app.use(Express.bodyParser());
	app.use(Express.session({
		secret: config.secret,
		maxAge: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), //2 weeks
		store: new MongoStore(config.mongo)
	}));
	app.use(Passport.initialize());
	app.use(Passport.session());
	app.use(app.router);
});


/**
 * Load the Controllers
 * @type {[type]}
 */
var Controllers = utils.loadDirectory('./app/controllers', '.controller.js');
for(var controller in Controllers){
	app.get('/', Controllers.combat.main);
	app.get('/' + controller, Controllers.combat.main);
	/*
	for(var action in Controllers[controller]){
		if(action != 'main'){
			app.get('/' + index + '/' + action, Controllers[controller][action]);
		}
	}
	*/
}

app.listen(config.server.port);
console.log(config.server.port);
//io.listen(app.listen(config.server.port));