'use strict';
const Markup = require('telegraf/markup');
const Composer = require('telegraf/composer');
const trackInfoHlp = require('../../helpers/track-info');

const infoStep = new Composer();

infoStep.use(async (context) => {
  let trackInfo;
  try {
    trackInfo = await trackInfoHlp(context.message.text);
    context.scene.state.info = trackInfo;
  } catch (error) {
    context.reply(`Ошибка: ${error.message}`);
    context.scene.leave();
    return;
  }
  context.replyWithHTML(
    `Хорошо, значит надо скачать <u>${trackInfo.title}</u> от <u>${trackInfo.author}</u>, которое будет разделено на <u>${trackInfo.partsCount}</u> частей`,
    Markup.inlineKeyboard([
      Markup.callbackButton('Ок - скачиваем', 'StartDownload'),
      Markup.callbackButton('Отмена', 'Cancel'),
      Markup.callbackButton('Заново', 'Reenter'),
    ]).extra(),
  );
  return context.wizard.next();
});
module.exports = infoStep;
