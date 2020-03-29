#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
program.version('1.0.0');
const { executeCaesarTransform } = require('../src/io');

/**
 *
 -s, --shift: a shift - required, positive number
 -i, --input: an input file  || defaults to stdin
 -o, --output: an output file || defaults to stdout
 -a, --action: an action encode/decode  -required
 */

program
    .requiredOption('-s, --shift <number>', 'shift for encoding')
    .requiredOption('-a, --action <string>', 'an action to do, encode/decode')
    .option('-i, --input <string>', 'path to input file')
    .option('-o --output <string>', 'path to output file');

program.parse(process.argv);

let inputStream = process.stdin;
let outputStream = process.stdout;

if (program.input) {
    inputStream = fs.createReadStream(program.input);
}
if (program.output) {
    outputStream = fs.createWriteStream(program.output);
}

switch (program.action) {
    case 'encode':
        program.shift = Math.abs(program.shift);
        break;
    case 'decode':
        program.shift = -1 * Math.abs(program.shift);
        break;
    default:
        console.error('Please provide either encode or decode in the --action option');
        process.exit(1);
}

executeCaesarTransform(inputStream, outputStream, program.shift);