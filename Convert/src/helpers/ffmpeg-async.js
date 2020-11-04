const ffmpeg = require('fluent-ffmpeg');
// const fsAsync = require('fs/promises');
// const fs = require('fs');
const path = require('path');

/**
 * Promisified ffmpeg predefined for decoding and save as mp3
 * @param {String} fileName Ttile of the file to decoding
 * @return {Promise} ffmpeg command
 */
function convertAsync(fileName) {
  return new Promise((resolve, reject) => {
    const { name, ext } = path.parse(fileName);
    const inputPath = path.join(process.env.DATADIR, name, `${name}${ext}`);
    const outputPath = path.join(process.env.DATADIR, name, `${name}.mp3`);
    // ffmpeg(fs.createReadStream(inputPath))
    ffmpeg(inputPath)
      .audioBitrate(128)
      .save(outputPath)
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(new Error(`Ощибка декодирования с сообщением ${error.message}`));
      })
      .run();
  });
}

/**
 * Split file to several parts
 * @param {String} inputFile Full path to input file
 * @param {String} outTemplate Template string for ffmpeg
 */
function splitAsync(inputFile, outTemplate) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFile)
      .outputOptions([
        '-f segment',
        `-segment_time ${process.env.LENGTHSEC}`,
        '-c:a libmp3lame',
      ])
      .output(outTemplate)
      .on('error', (error) => {
        reject(new Error(`Ошибка разделения с сообщением ${error.message}`));
      })
      .on('end', () => {
        resolve();
      })
      .run();
  });
}
exports.splitAsync = splitAsync;
exports.convertAsync = convertAsync;
