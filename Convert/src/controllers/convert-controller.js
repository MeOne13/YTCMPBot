const ffmpegAsync = require('../helpers/ffmpeg-async');
const winston = require('../config/winston');

module.exports = async (request, response, next) => {
	let fileName = request.body.fileName;
	await ffmpegAsync.convertAsync(fileName);
	try {
		await ffmpegAsync.convertAsync(fileName);
	} catch (error) {
		winston.error(`${error.message}`);
		return response.status(400).json({
			status: 'fail',
			message: `${error.message}`,
		});
	}
	response.status(200).json({
		status: 'success',
	});
};
