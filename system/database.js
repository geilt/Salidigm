var Mongoose = require("mongoose");
/**
 * Load All Schemas
 */
require('./utils.js').loadDirectory('./app/models', '.model.js');

/**
 * Export Mongoose with Schemas
 */
module.exports = Mongoose;