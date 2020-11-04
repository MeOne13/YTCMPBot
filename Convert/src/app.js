'use strict';
require('dotenv').config();
// const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const winston = require('./config/winston');
// const rfs = require('rotating-file-stream');
const convertRouter = require('./routers/convert-routes');
const splitRouter = require('./routers/split-routes');

fs.mkdirSync(process.env.LOGDIR, {
  recursive: true,
});

const app = express();

morgan.token('fileName', (request) => request.body.fileName);
// morgan.token('errMessage', (_req, res) => res.body.message);

// const accessLogStream = rfs.createStream('access.log', {
// 	size: '10M',
// 	path: path.join(process.env.LOGDIR),
// });
// const errorsLogStream = rfs.createStream('errors.log', {
// 	size: '10M',
// 	path: path.join(process.env.LOGDIR),
// });

app.use(express.json());
// app.use(
// 	morgan('[:date ":url" :status :fileName :errMessage', {
// 		skip(_req, res) {
// 			return res.statusCode < 400;
// 		},
// 		stream: errorsLogStream,
// 	})
// );
app.use(
  morgan('[:date ":url" :status :fileName', {
    stream: winston.stream,
  }),
);

app.use('/api/v1/convert', convertRouter);
app.use('/api/v1/split', splitRouter);
app.use('/api/v1/ping', (request, response) => {
  response.status(200).json({
    status: 'pong',
  });
});

module.exports = app;
