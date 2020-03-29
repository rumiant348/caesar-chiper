const fs = require('fs');
const { Transform } = require('stream');
const { codeString } = require('./encoding');


function caesarTransformStream(key) {
    return new Transform({
        transform(chunk, encoding, callback) {
            try {
                this.push(codeString(chunk, key));
                callback();
            } catch (e) {
                callback(e);
            }
        }
    });
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

testRead();

module.exports = {
    executePipeline
};

