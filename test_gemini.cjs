require('dotenv').config();
const { GoogleGenAI, Type } = require('@google/genai');

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const prompt = 'Analyze my Valorant profile: Name: Feijao#11128 Rank: Platinum 1 Recent Match Summaries: []';
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: { 
        systemInstruction: "You are a toxic analyst.",
        temperature: 0.9,
        responseMimeType: "application/json",
        responseSchema: {
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
        }
      },
    });
    console.log("SUCCESS");
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}
test();
