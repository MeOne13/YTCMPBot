'use strict';

const path = require('path');
const axios = require('axios');
const Composer = require('telegraf/composer');
const ytdlAsync = require('../../helpers/ytdl-async');
const { checkFolders } = require("../../helpers/check-folders");
const { replyWithTracks } = require("../../helpers/reply-with-tracks");
const { cleanUp } = require("../../helpers/cleanup");

exports.replyWithTracks = replyWithTracks;
const resultStep = new Composer();

resultStep.use(async (context) => {
  context.reply(
    'Скачиваю и декодирую файлы. Подождите немного... Они будут появляться по мере готовности',
  );

  const outputDirectory = path.join(process.env.DATADIR, context.scene.state.info.title);
  const filePath = path.join(outputDirectory, `${context.scene.state.info.title}.mp3`);
  const partsDirectory = path.join(outputDirectory, 'parts');

  if (await checkFolders(outputDirectory, partsDirectory, context)) return context.scene.leave();

  try {
    await ytdlAsync(context.scene.state.info.id, filePath);

    const result = await axios.get(process.env.CONVADDR, {
      data: {
        fileName: `${context.scene.state.info.title}.mp3`,
      },
    });

    if (result.status !== 200) {
      throw new Error(
        'Ошибка разделения файла. Попробуйте позже, или другой файл!',
      );
    }

    await replyWithTracks(context, partsDirectory);
    await cleanUp();
  } catch {
    context.reply(
      'Что-то плохое случилось со скачиванием или декодированием. Попробуйте позже, или что-то другое.',
    );
  }
  return context.scene.leave();
});
module.exports = resultStep;
