/**
 * Mongoose Schema for Express Sessions.
 * @author  Robert Pitt @robertpitt
 * @see https://github.com/robertpitt/blog/blob/master/system/models/session.js
 */
var Mongoose = require('mongoose'),
	_Store = require('express').session.Store;

var Session = new Mongoose.Schema({
	sid: {
		type: String,
		required: true,
		unique: true
	},
	expires: {
		type: Date,
		required: true
	},
	session: {
		type: String,
		required: false
	}
});

/**
 * Set or update a session to MongoDB
 * @param {String}   sid      Session Identifier
 * @param {Object}   session  New session data
 * @param {Function} callback callback for completion
 */
Session.statics.set = function(sid, session, callback) {
	try {
		var newSession = {
			sid: sid,
			session: JSON.stringify(session)
		};

		/**
		 * Update the session expiry time
		 */
		if (session && session.cookie && session.cookie._expires) {
			newSession.expires = new Date(session.cookie._expires);
		}

		/**
		 * Update/insert the session
		 */
		this.update({
			sid: sid
		}, newSession, {
			upsert: true
		}, function(err, data) {
			callback && callback(err || null);
		});
	} catch (err) {
		callback && callback(err);
	}
};

/**
 * Return a session object from the storage
 * @param  {String}   sid      Session Identifer
 * @param  {Function} callback Callback upon completion
 */
Session.statics.get = function(sid, callback) {
	/**
	 * create a scoped reference to the local object
	 */
	var self = this;

	/**
	 * Find the session from the database
	 */
	this.findOne({
		sid: sid
	}, function(err, result) {
		if (err) {
			callback && callback(err, null);
			return;
		}

		try {
			/**
			 * If we have a result, parse the session and send it back.
			 */
			if (result) {
				if (!result.expires || new Date() < result.expires) {
					callback(null, JSON.parse(result.session));
					return;
				}

				self.destry(sid, callback);
				return;
			}

			callback && callback(null, null);
		} catch (e) {
			callback && callback(e);
		}
	});
};

/**
 * Destroy and individual session
 * @param  {[type]}   sid      Session Identifier
 * @param  {Function} callback ..
 */
Session.statics.destroy = function(sid, callback) {
	this.remove({
		sid: sid
	}, function() {
		callback && callback(null, null);
	});
};

/**
 * Delete all session for the database
 * @param  {Function} callback ..
 */
Session.statics.clear = function(callback) {
	/**
	 * Pass the callback to the drop method of the collection
	 */
	this.drop(callback);
};

/**
 * Returns the count of sessions within the store
 * @param  {Function} callback callled when process is completed
 */
Session.statics.length = function(callback) {
	collection.count({}, callback);
};

/**
 * Import the Sesssion Store structure
 */
Session.statics.createSession = _Store.prototype.createSession.bind(_Store.Store);
Session.statics.load = _Store.prototype.load.bind(_Store.Store);
Session.statics.regenerate = _Store.prototype.regenerate.bind(_Store.Store);

//export the model
module.exports = Mongoose.model("Session", Session);