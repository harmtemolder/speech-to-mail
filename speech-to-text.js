/* adapted from: https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries */

async function convert(fileName, encoding, sampleRate, language, addPunctuation) {
  // Imports required libraries
  const speech = require('@google-cloud/speech');
  const fs = require('fs');
  const base64 = require('./base64.js');

  // Creates a client
  const client = new speech.SpeechClient();

  // Reads a local audio file and converts it to base64
  const audio = {
    content: base64.encode(fileName),
  };

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const config = {
    encoding: encoding || 'FLAC',
    sampleRateHertz: sampleRate || 44100,
    languageCode: language || 'nl-NL',
    enableAutomaticPunctuation: addPunctuation || true,
  };

  // Prepares request object
  const request = {
    audio,
    config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');
  return (transcription);
}

module.exports.convert = convert;
