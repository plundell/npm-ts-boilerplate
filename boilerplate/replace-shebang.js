/**
 * @file This script should be run after compiling the typescript source into javascript. It replaces
 *       the ts-node shebang with a javascript equivilent
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const filePath = './dist/bin/run.js';

// read the contents of the file
const contents = fs.readFileSync(filePath, 'utf8');

// split the contents into an array of lines
const lines = contents.split(/\r?\n/);

// replace the first line with the new shebang
lines[0] = '#!/usr/bin/env node';

// join the array of lines back into a single string
const newContents = lines.join('\n');

// write the modified contents back to the file
fs.writeFileSync(filePath, newContents, 'utf8');
