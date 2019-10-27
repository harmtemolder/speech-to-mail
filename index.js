/* eslint no-console: 'off' */

const fs = require('fs');
const path = require('path');

const speechToText = require('./speech-to-text.js');
// const mail = require('./mail.js');e

const defaultDir = '/Users/harmtemolder/stack/Recordings/';

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
  document.getElementById('box').innerHTML = html;
}

(function batchConvert(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`index.js/convertAll: Error reading ${dir}:`, err);
      process.exit(1);
    }

    const convertResults = [];

    // Only keep .flac files
    const flacFiles = files.filter((file, index) => file.endsWith('.flac') && index < 10); // TODO Remove cap

    const promises = flacFiles.map((file) => {
      const filePath = path.join(dir, file);

      return speechToText.convert(filePath).then((convertedText) => {
        convertResults.push({
          filePath,
          convertedText,
        });
      }).catch(console.error);
    });

    Promise.all(promises).then(() => {
      // If all conversions went well, convert the resulting array of objects to a table that can be mailed
      resultsToTable(convertResults);

      console.log(convertResults);
    }).catch(console.error);
  });
}(defaultDir));
