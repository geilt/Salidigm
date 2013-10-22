exports.secret = 'aspfnweovt234890pth9834hbt9w3';
exports.server = {
	port: 8080,
	domain: 'salidigm.com'
};
exports.mongo = {
	db: 'salidigm',
	host: 'localhost',
	port: 27017,  // optional, default: 27017
	options: {

	},
	name: 'Salidigm'
};

exports.mongo.dsn = 'mongodb://' + exports.mongo.host + ':'+ exports.mongo.port + '/' + exports.mongo.db,

exports.oauth = {
	google: {
		"web": {
			"auth_uri": "https://accounts.google.com/o/oauth2/auth",
			"client_secret": "kx7WENkXydolKaMSQ3jN5jtx",
			"token_uri": "https://accounts.google.com/o/oauth2/token",
			"client_email": "391794118438@developer.gserviceaccount.com",
			"redirect_uris": ["http://ikkf.gei.lt:11342/oauth/google/return"],
			"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/391794118438@developer.gserviceaccount.com",
			"client_id": "391794118438.apps.googleusercontent.com",
			"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
			"javascript_origins": ["http://ikkf.gei.lt"]
		}
	}
};