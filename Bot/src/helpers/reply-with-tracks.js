'use strict';
const fs = require('fs');
const fsAsync = require('fs').promises;

/**
 * Reply with audio file parts
 * @param {Context} ctx Scene context
 * @param {Array} parts Array of string with parts paths
 */

async function replyWithTracks(context, partsDirectory) {

    const parts = await fsAsync.readdir(partsDirectory);
    for (const [index, part] of parts.entries()) {
        await context.replyWithAudio(
            {
                source: fs.createReadStream(part),
            },
            { title: `${context.scene.state.info.title} часть ${index + 1}` }
        );
    }
}
module.exports = replyWithTracks;