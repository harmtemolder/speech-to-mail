/* adapted from: https://www.hacksparrow.com/nodejs/base64-encoding-decoding-in-node-js.html */

const fs = require('fs');

// function to encode file data to base64 encoded string
function encode(inputFile) {
  const bitmap = fs.readFileSync(inputFile);
  return Buffer.from(bitmap).toString('base64');
}

// function to decode base64 encoded string to file
function decode(inputString, outputFile) {
  const bitmap = Buffer.from(inputString, 'base64');
  fs.writeFileSync(outputFile, bitmap);
}

module.exports.encode = encode;
module.exports.decode = decode;
