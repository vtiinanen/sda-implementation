'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const { config, errorHandler, logger } = require('./utils');
const { names } = require('./routes');

const app = express();
app.options('*', cors()); //enable pre-flight cors

app.use(morgan(config.MORGAN_PRINT_LEVEL));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(helmet());
app.use(cors(config.corsOptions));

app.use('/names', names);

app.use((_req, _res, next) => next({ message: 'unknown endpoint', status: 404 }));
app.use(errorHandler);

const server = app.listen(config.PORT, () => logger.info('Express started at ' + config.PORT));
server.on('error', e => logger.error(e));

module.exports = { app, server };
