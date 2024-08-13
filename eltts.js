import dotenv from 'dotenv'
import { ElevenLabsClient, ElevenLabs } from "elevenlabs";
import { createWriteStream } from 'fs'; // Import the file system module
dotenv.config()

async function convertTextToSpeech() {
    try {
        const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

        // Perform the text-to-speech conversion
        const responseStream = await client.textToSpeech.convert("pMsXgVXv3BLzUgSXRplE", {
            optimize_streaming_latency: ElevenLabs.OptimizeStreamingLatency.Zero,
            output_format: ElevenLabs.OutputFormat.Mp32205032,
            text: "It sure does, Jackie… My mama always said: “In Carolina, the ass so thick you can tear it!”",
            voice_settings: {
                stability: 0.5, // Higher stability for less variation in tone
                similarity_boost: 0.7, // Closer match to the original voice's characteristics
                style: 0.6 // Adjust to make the voice sound more expressive
            }
        });

        // Create a write stream to save the audio file
        const writeStream = createWriteStream('eltts.mp3');

        // Pipe the response stream to the file
        responseStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('Audio file has been saved as output.mp3');
        });

        writeStream.on('error', (err) => {
            console.error('Error writing the audio file:', err);
        });

    } catch (error) {
        console.error("Error during text-to-speech conversion:", error);
    }
}

convertTextToSpeech();