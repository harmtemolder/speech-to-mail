/* eslint no-console: 'off' */

const speechToText = require('./speech-to-text.js');
const mail = require('./mail.js');

const inputFileName = '/Users/harmtemolder/Downloads/Temp/20190818_104805.flac';

speechToText.convert(inputFileName).then((convertedText) => {
  mail.send(
    'Speech-to-Text',
    convertedText
  );
}).catch(console.error)
