var Mongoose = require("mongoose"),
	path = require("path");
/**
 * Require System Session Schema
 */
require('./schemas/session.schema.js');
/**
 * Load all app models and schemas
 */
require('./utils.js').loadDirectory(path.resolve(__dirname,'../app/models'), '.model.js');
/**
 * Export Mongoose with schemas
 */
module.exports = Mongoose;