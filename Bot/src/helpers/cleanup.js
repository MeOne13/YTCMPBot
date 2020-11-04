'use strict';
const path = require('path');
const fsAsync = require('fs').promises;

/**
 * Remove excess folders (if there more than 4 folders with tracks)
 */
async function cleanUp() {
    try {
        const downloads = await fsAsync.readdir(process.env.DATADIR);
        if (downloads.length > 4) {
            await fsAsync.rmdir(
                path.join(process.env.DATADIR, downloads[downloads.length - 1]),
                { recursive: true }
            );
        }
    } catch {
        // continue regardless of error
    }
}
exports.cleanUp = cleanUp;
