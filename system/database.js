var Mongoose = require("mongoose"),
	path = require("path");
/**
 * Load All Schemas
 */
require('./utils.js').loadDirectory(path.resolve(__dirname,'../app/models'), '.model.js');

/**
 * Export Mongoose with Schemas
 */
module.exports = Mongoose;