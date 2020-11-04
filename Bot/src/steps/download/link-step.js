'use strict';
const Markup = require('telegraf/markup');
const Composer = require('telegraf/composer');

const linkStep = new Composer();

linkStep.use((context) => {
  context.reply(
    'Киньте ссылку на видео для скачивания',
    Markup.inlineKeyboard([Markup.callbackButton('Отмена', 'Cancel')]).extra(),
  );
  return context.wizard.next();
});

module.exports = linkStep;
