var config = require('../config'),
	database = require('./database'),
	library = require('./library'),
	utils = require('./utils'),
	path = require('path'),
	Express = require('express'),
	http = require('http'),
	sio = require('socket.io'),
	stylus = require('stylus'),
	nib = require('nib'),
	
	router = require('./router');
/**
 * System Object. For passing into various Functions.
 * @type {Object}
 */


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
	/* Not Needed Anymore due to Binds.
	app.use(function(req, res, next) {
		//Dont have to pass the database around, it is now in every request in Express.
		for (var i in system) {
			req[i] = system[i];
		}
		next();
	});
	*/

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
		store: database.model("Session"),
		secret: config.server.secret,
		key: config.server.secret,
		maxAge: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), //2 week
	}));
	app.use(app.router);
});

var system = {
	config: config,
	database: database,
	library: library,
	utils: utils,
	app: app
};

/**
 * Load the Controllers
 * @type {[type]}
 */
var SystemController = new (require('./controller'))();

/**
 * Set Controller Objects.
 */
for (var obj in system){
	SystemController.set(obj, system[obj]);	
}
var Controllers = utils.loadDirectory(path.resolve(__dirname, '../app/controllers'), '.controller.js');

/**
 * Loop through controllers.
 */
for(var controller in Controllers){
	/**
	 * Loops through actions and bind controller and actions to routes. 
	 * main is always the root action if nothing is set. Main is also ignored.
	 */
	if(Controllers[controller].hasOwnProperty('actions')){
		if(Controllers[controller].actions.hasOwnProperty('main')){
			app.get('/' + controller, Controllers[controller].actions.main.bind(SystemController));
		}
		for(var action in Controllers[controller].actions){
			if(action != 'main'){
				app.get('/' + controller + '/' + action, Controllers[controller].actions[action].bind(SystemController));
			}
		}
	}
	/**
	 * Runs init function if set. Useful for timers, timeouts and processes to run when the server starts up.
	 */
	if(Controllers[controller].hasOwnProperty('init')){
		Controllers[controller].init.bind(SystemController)();
	}
}

var server = http.createServer(app).listen(config.server.port);

var io = sio.listen(server);

/**
 * Start Sockets
 */
io.sockets.on('connection', function(socket){
	/**
	 * Bind Socket to SystemController
	 */
	var SocketController = new (require('./controller'))();
	for (var obj in system){
		SocketController.set(obj, system[obj]);	
	}
	SocketController.set('socket', socket);
	/**
	 * Loop through controllers and bind all websocket methods.
	 */
	for(var controller in Controllers){
		if(Controllers[controller].hasOwnProperty('websockets')){
			for(var websocket in Controllers[controller].websockets){	
				socket.on(controller + '/' + websocket, Controllers[controller].websockets[websocket].bind(SystemController));
			}
		}
	}
});

console.log('Listening on port ' + config.server.port);