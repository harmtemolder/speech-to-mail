/* eslint no-console: 'off' */

const speechToText = require('./speech-to-text.js');

const inputFileName = '/Users/harmtemolder/Downloads/Temp/20190818_104805.flac';

speechToText.convert(inputFileName).then(console.log).catch(console.error);
