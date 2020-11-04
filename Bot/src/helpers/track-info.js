'use strict';
const ytdl = require('ytdl-core');
/**
 * Return info object about track
 * @param {String} url URL or id of video
 */
// TODO: replace "info.length_seconds" with "info.videoDetails.lengthSeconds" and so on
async function infoStep (url) {
  if (!url || !ytdl.validateURL(url)) {
    throw new Error('Некорректная ссылка.');
  }
  try {
    const videoInfo = await ytdl.getInfo(url);
    const durationMS = `${Math.floor(videoInfo.length_seconds / 60)}.${
      videoInfo.length_seconds % 60
    }`;
    const parts = -Math.floor(
      -videoInfo.length_seconds / process.env.LENGTHSEC
    );
    return {
      // title: videoInfo.title.replace(/[&/\\#,"«» ,+|!()@$~%.'":*?<>{}]/g, ''),
      title: videoInfo.title.replace('|', '').toString('ascii'),
      author: videoInfo.author.name,
      duration: durationMS,
      baseURl: videoInfo.video_url,
      partsCount: parts,
      id: ytdl.getVideoID(url)
    };
  } catch  {
    throw new Error('Что-то пошло не так. Попробуйте что-то другое.');
  }
}
module.exports = infoStep;
