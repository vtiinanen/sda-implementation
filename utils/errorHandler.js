const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	logger.error(__filename.slice(__dirname.length + 1), err);
	return res.status(err.status || 500).send({ message: err.message || 'Unexpected server error' });
};
