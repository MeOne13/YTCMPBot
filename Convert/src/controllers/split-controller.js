// const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const ffmpegAsync = require('../helpers/ffmpeg-async');

module.exports = async (request, response) => {
  const { fileName } = request.body;
  if (!fileName) {
    return response.status(400).json({
      status: 'failure',
      message: 'No filename field'
    });
  }

  const { name } = path.parse(fileName);
  const inputFile = path.join(process.env.DATADIR, name, `${name}.mp3`);
  const outputDirectory = path.join(process.env.DATADIR, name, 'parts');
  const outTemplate = path.join(outputDirectory, `${name}%2d.mp3`);

  fs.mkdirSync(outputDirectory, { recursive: true });

  try {
    await ffmpegAsync.splitAsync(inputFile, outTemplate);
  } catch (error) {
    return response.status(400).json({
      status: 'fail',
      message: `${error.message}`
    });
  }
  return response.status(200).json({
    status: 'success'
  });
};
