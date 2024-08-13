// Import the Google Cloud Text-to-Speech module
const textToSpeech = require('@google-cloud/text-to-speech');
const dotenv = require('dotenv');
dotenv.config()

// Import other required libraries
const {writeFile} = require('node:fs/promises');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

async function quickStart() {
  // The text to synthesize
  const text = 'Create a Pixar-style animated caricature of Steppenwolf, a powerful and menacing alien warlord. He should be depicted with a massive axe, showcasing his imposing stature and fierce expression. The background should be otherworldly, filled with vibrant colors and alien landscapes, emphasizing his intimidating presence but maintaining a playful Pixar aesthetic. No text in the image.';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = client.synthesizeSpeech(request);

  // Save the generated binary audio content to a local file
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}

quickStart();