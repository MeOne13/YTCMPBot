'use strict';
require('dotenv').config();
const fs = require('fs');
// const morgan = require('morgan');
const express = require('express');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const downloadScene = require('./scenes/download-scene');

const app = express();

if (!fs.existsSync(process.env.DATADIR)) {
  fs.mkdirSync(process.env.DATADIR, { recursive: true });
}

const bot = new Telegraf(process.env.TGTOKEN);
bot.start((context) => {
  context.reply(
    `Могу качать, могу искать... Что будем делать, ${context.from.first_name}?`,
    Markup.inlineKeyboard([
      Markup.callbackButton('⬇️ Скачать аудио треки', 'DownloadScene'),
      Markup.callbackButton('🔎 Искать (пока не могу)', 'SearchScene'),
    ]).extra(),
  );
});

const stage = new Stage([downloadScene])
  .action('Cancel', (context) => {
    context.scene.leave();
  })
  .action('Reenter', (context) => {
    context.scene.reenter();
  });

bot.telegram.setWebhook(`${process.env.ADDRESS}/secret-path`);
bot.use(session());
bot.use(stage.middleware());

bot.action('DownloadScene', (context) => context.scene.enter('downloadScene'));
bot.command('download', (context) => context.scene.enter('downloadScene'));

app.use(bot.webhookCallback('/secret-path'));
app.listen(3000);
