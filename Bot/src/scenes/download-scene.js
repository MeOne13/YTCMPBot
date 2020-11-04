const WizardScene = require('telegraf/scenes/wizard');
const linkStep = require('../steps/download/link-step');
const infoStep = require('../steps/download/info-step');
const resultStep = require('../steps/download/result-step');

const downloadScene = new WizardScene(
  'downloadScene',
  {},
  linkStep,
  infoStep,
  resultStep
);
module.exports = downloadScene;
