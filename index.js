/* eslint no-console: 'off' */

const fs = require('fs');
const path = require('path');

const speechToText = require('./speech-to-text.js');
const mail = require('./mail.js');

const defaultDir = '/Users/harmtemolder/STACK/Recordings';
// const defaultDir = '/Users/harmtemolder/STACK/Inbox/Telefoon/WhatsApp/Media/WhatsApp Voice Notes/202003';

// function convertAndMail(file) {
//   speechToText.convert(inputFileName).then((convertedText) => {
//     mail.send(
//       'Speech-to-Text',
//       convertedText
//     );
//   }).catch(console.error)
// }

function resultsToTable(arrayOfObjects) {
  /* This function takes an array of objects and draws an HTML table where every item of the array is a row and every
  property of that item is a column. */
  let html = '<table border="1|1">';

  arrayOfObjects.forEach((row) => {
    html += '<tr>';
    html += `<td>${row.filePath}</td>`;
    html += `<td>${row.convertedText}</td>`;

    html += '</tr>';
  });

  html += '</table>';

  return html;
}

(function batchConvert(dir, fileExtension) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`index.js/batchConvert: Error reading ${dir}:`, err);
      process.exit(1);
    }

    const convertResults = [];

    // Only keep .flac files
    const filteredFiles = files.filter((file, index) => file.endsWith(`.${fileExtension}`));// && index < 10); // TODO Remove cap

    const promises = filteredFiles.map((file) => {
      const filePath = path.join(dir, file);

      return speechToText.convert(filePath, undefined, undefined, 'nl-NL', undefined).then((convertedText) => {
        convertResults.push({
          filePath,
          convertedText,
        });
      }).catch(console.error);
    });

    Promise.all(promises).then(() => {
      // If all conversions went well, convert the resulting array of objects to a table that can be mailed
      const resultsTable = resultsToTable(convertResults);

      // And mail those results using Google's Gmail API
      mail.send('Speech-to-Text', resultsTable);
      // console.log(resultsTable);
    }).catch(console.error);
  });
}(defaultDir, 'flac'));
