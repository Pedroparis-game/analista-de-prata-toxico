import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
    try {
        const responseSchema = {
          type: Type.OBJECT,
          properties: {
            archetype: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "description"]
            },
            scoutingReport: {
              type: Type.OBJECT,
              properties: {
                rankLevel: { type: Type.STRING },
                mechanical: { type: Type.STRING },
                mental: { type: Type.STRING }
              },
              required: ["rankLevel", "mechanical", "mental"]
            },
            crushingSummary: { type: Type.STRING }
          },
          required: ["archetype", "scoutingReport", "crushingSummary"]
        };
        const res = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: "Hello",
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema
            }
        });
        console.log("Success:", res.text);
    } catch(err) {
        console.error("Stringified error:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    }
}
run();
