import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
    try {
        const res = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: "Hello",
        });
        console.log("Success:", res.text);
    } catch(err) {
        console.error("Error properties:", Object.getOwnPropertyNames(err));
        console.error("Stringified error:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    }
}
run();
