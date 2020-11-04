const winston = require('winston');

const logsPath = process.env.LOGDIR;
var options = {
	fileAccess: {
		level: 'info',
		filename: `${logsPath}/access.log`,
		handleExceptions: false,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	fileErrors: {
		level: 'error',
		filename: `${logsPath}/errors.log`,
		handleExceptions: false,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	fileExceptions: {
		filename: `${logsPath}/exceptions.log`,
		// handleRejections: true,
		// handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	console: {
		level: 'debug',
		handleExceptions: false,
		json: true,
		colorize: true,
	},
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
	transports: [
		new winston.transports.File(options.fileAccess),
		new winston.transports.File(options.fileErrors),
		new winston.transports.File(options.fileExceptions),
		new winston.transports.Console(options.console),
	],
	exceptionHandlers: [new winston.transports.File(options.fileExceptions)],
	rejectionHandlers: [new winston.transports.File(options.fileExceptions)],
	exitOnError: false, // do not exit on handled exceptions
});
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function (message, encoding) {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger.info(message);
	},
};

module.exports = logger;
