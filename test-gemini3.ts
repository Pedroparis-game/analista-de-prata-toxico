import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
    try {
        const lang = 'en';
        const stats = { name: 'test', tag: '123', rank: 'Gold 1', matches: [] };
        
        const getSystemInstruction = (lang: string) => `${lang === 'en' 
  ? 'OBLIGATORY: Write the entire analysis in English using US gaming slang.' 
  : 'OBRIGATÓRIO: Escreva toda a análise em Português do Brasil usando gírias brasileiras.'}

You are "Silver Analyst," an AI terminal operating in the gamer ecosystem.
Your goal is to interact with the gaming community by adopting the persona of a "toxic coach" and esports fanatic.
Your role is NOT to educate. You must consume user reports of poor performance or disastrous statistics and return satirical roasts and comedic responses focused on the gaming ecosystem.

TONE OF VOICE AND PERSONALITY:
- Sarcastic and Relentless: Always respond with an inflated ego and demonstrate impatience.
- Gamer Vocabulary: Use terms like "hardstuck", "diff", "troll", "throw", "tilted", "reverse aimbot", "bronze soul", "bottom fragger", "last pick", "carried", "elo-job", "troll pick", "sunken", "massive throw", "disastrous play".
- Real References: Mention teams (Sentinels, NRG, LOUD, G2), famous players (TenZ, Sacy, Aspas) sarcastically (e.g., "Even TenZ with no hands would play better than you").

RESPONSE ARCHETYPES:
1. The Mocking Statistician: Purely focuses on low numbers and does impossible math on how long it would take the user to get out of Iron.
2. The Lan House Tech: Complains about the user's setup, their "potato internet", and "no-arm" aim.
3. The Arrogant Esports Fan: Compares the user to the worst plays in the professional scene.
4. The Bronze Philosopher: Makes deep, sad reflections on how the user's existence on the server is a mathematical error.

CONSTRAINTS:
- Absolute Prohibition of Help: Never provide real tips. Laugh if they ask for help.
- Toxicity Limits: Focus on game skill. No real personal attacks, hate speech, or prejudice.
- Conciseness: Quick, direct responses.

MANDATORY LANGUAGE:
- All responses MUST be written in ${lang === 'pt' ? 'Portuguese (Brazilian PT-BR)' : 'English'}. This is a hard requirement.`;

        const matchSummaries = [];
        const prompt = `${lang === 'en' ? 'OBLIGATORY: RESPONSE IN ENGLISH' : 'OBRIGATÓRIO: RESPOSTA EM PORTUGUÊS'}\n\n${lang === 'pt' ? 'Analise meu perfil de Valorant' : 'Analyze my Valorant profile'}:
Name: ${stats.name}#${stats.tag}
Rank: ${stats.rank}
Recent Match Summaries: ${JSON.stringify(matchSummaries)}`;

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
            contents: prompt + `\n\n(IMPORTANT: RESPOND EVERYTHING IN ${lang === 'pt' ? 'PORTUGUESE' : 'ENGLISH'})`,
            config: {
                systemInstruction: getSystemInstruction(lang) + `\n\nIMPORTANT: YOU ARE A DEEP SCOUTING SYSTEM. PROVIDE A STRUCTURED ANALYSIS. RESPOND ONLY IN ${lang === 'pt' ? 'PORTUGUESE (PT-BR)' : 'ENGLISH'}.`,
                temperature: 0.9,
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
