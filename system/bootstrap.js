/**
 * Loads all modules required by the system so they are cached at the start.
 */
var config = require('../config'),
	utils = require('./utils'),
	Express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
	database = require('./database'),
	router = require('./router.js');
