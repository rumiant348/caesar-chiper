const fs = require('fs');
const { Transform } = require('stream');
const { codeString } = require('./encoding');


function caesarTransformStream(shift) {
    return new Transform({
        transform(chunk, encoding, callback) {
            try {
                this.push(codeString(chunk, shift));
                this.push('\n')
                callback();
            } catch (e) {
                callback(e);
            }
        }
    });
}

function executeCaesarTransform(readableStream, writeableStream, shift) {
    const transformStream = caesarTransformStream(shift);
    executePipeline(readableStream, transformStream, writeableStream);
}

function executePipeline(readableStream, transformStream, writeableStream) {
    readableStream
        .on('error', logError)
        .pipe(transformStream)
        .on('error', logError)
        .pipe(writeableStream)
        .on('error', logError);
}

function testRead() {
    const readableStream = fs.createReadStream('../test.txt', {encoding: 'utf-8'});
    const writeableStream = process.stdout;
    const transformStream = caesarTransformStream(7)

    executePipeline(readableStream, transformStream, writeableStream);
}

function logError(err) {
    console.error(err.message);
    process.exit(1);
}

module.exports = {
    executeCaesarTransform
};

