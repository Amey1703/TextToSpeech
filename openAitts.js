import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const speechFile = path.resolve("./speech.mp3");

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input:
      "Batman stands in the background of a desolate wasteland at dusk, the sun setting and casting an orange glow across the horizon. Rusty debris litters the ground, and a thick dust cloud hangs in the air from past battles. The camera is positioned at a low angle, focusing on Iron Man confronting Thanos, while Batman strategically watches, preparing to throw a ball to create a distraction for Iron Man. The atmosphere is charged with tension as Batman considers his next move.",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
main();
