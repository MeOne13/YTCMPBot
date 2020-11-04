'use strict';
// const fs = require('fs');
const path = require('path');
const { fsAsync, replyWithTracks } = require("../steps/download/result-step");

/**
 * Check if track already downloaded and reply if is
 * @param {String} outputDirectory Dir with downloaded full mp3
 * @param {String} partsDirectory Dir with splitted parts
 * @param {Context} ctx Scene context for sending messages
 */
async function checkFolders(outputDirectory, partsDirectory, context) {
  try {
    await fsAsync.stat(outputDirectory);
    await fsAsync.stat(partsDirectory);
    const parts = await fsAsync.readdir(partsDirectory);
    if (parts.length === context.scene.state.info.partsCount) {
      const partsPaths = parts.map((part) => path.join(partsDirectory, part));
      replyWithTracks(context, partsPaths);
    }
    return parts.length;
  } catch {
    await fsAsync.mkdir(outputDirectory, { recursive: true });
    //   fs.mkdirSync(outputDirectory, { recursive: true });
    // await mkdirp(outputDir);
    return 0;
  }
}
exports.checkFolders = checkFolders;
