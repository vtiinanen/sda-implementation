// Production condition
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// Default configs
let PORT = process.env.PORT || 8080;
let MORGAN_PRINT_LEVEL = process.env.MORGAN_PRINT_LEVEL || 'tiny';
let NAME_DATABASE_URL =
	process.env.NAME_DATABASE_URL || 'https://raw.githubusercontent.com/solita/dev-academy-2021/main/names.json';
// Set cors policy for backend
var whitelist = process.env.CORS_WHITELIST;

// Testing conditions
if (process.env.NODE_ENV === 'test') {
	PORT = 3001;
	whitelist = ['*'];
}

let corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

module.exports = {
	NAME_DATABASE_URL,
	PORT,
	MORGAN_PRINT_LEVEL,
	corsOptions,
};
