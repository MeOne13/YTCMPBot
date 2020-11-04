'use strict';
const fs = require('fs');
const ytdl = require('ytdl-core');
/**
 * Promisified ytdl-core downloading and saving MP3
 * @param {String} id id or url to video
 * @param {String} outputFilePath Full path to output file
 */
async function downloadAudioAsync(id, outputFilePath) {
  return new Promise((resolve, reject) => {
    if (!outputFilePath) {
      reject(new Error('Wrong output file path'));
    }
    const audioReadableStream = ytdl(id, { filter: 'audioonly' });
    const audioWritableStream = fs.createWriteStream(outputFilePath);
    const stream = audioReadableStream.pipe(audioWritableStream);
    stream
      .on('finish', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(new Error(`Ошибка скачивания с сообщением ${error.message}`));
      });
  });
}
module.exports = downloadAudioAsync;
