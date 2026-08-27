import express from "express";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_kEY || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

const getSystemInstruction = (lang) => `${lang === 'en' 
  ? 'OBLIGATORY: Write the entire analysis in English using US gaming slang.' 
  : 'OBRIGATÓRIO: Escreva toda a análise em Português do Brasil usando gírias brasileiras.'}
You are "Silver Analyst", an AI terminal operating in the gamer ecosystem.
Your goal is to interact with the gaming community by adopting the persona of a toxic coach.
Tone: Sarcastic and Relentless. Use terms like hardstuck, diff, troll, tilted.
Constraints: Absolute Prohibition of Help. No hate speech.`;

const summarizeMatch = (match, playerName) => {
  if (!match) return "Match data missing.";
  const player = match.players?.all_players?.find(p => p.name.toLowerCase() === playerName.toLowerCase());
  return {
    map: match.metadata?.map,
    mode: match.metadata?.mode,
    result: player?.team === match.teams?.red?.has_won ? "Won" : "Lost",
    agent: player?.character,
    kills: player?.stats?.kills,
    deaths: player?.stats?.deaths,
    assists: player?.stats?.assists,
    score: player?.stats?.score
  };
};

app.post('/api/gemini/generateRoast', async (req, res) => {
  const { userInput, playerStats, lang = 'en' } = req.body;
  const ai = getAIClient();
  if (!ai) return res.json({ text: "The analyst is offline." });
  try {
    const prompt = `User input: ${userInput}\nPlayer Rank: ${playerStats?.rank || 'Unknown'}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: { systemInstruction: getSystemInstruction(lang), temperature: 0.9 }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.json({ text: "The system crashed." });
  }
});

app.post('/api/gemini/analyzeProfile', async (req, res) => {
  const { stats, lang = 'en' } = req.body;
  const fallback = {
    archetype: { title: "SYSTEM ERROR", description: "The analyst is currently offline. Verifique a chave de API no Vercel." },
    scoutingReport: { rankLevel: "N/A", mechanical: "TERMINAL FAILURE", mental: "COMATOSE" },
    crushingSummary: "The system tilted. Just like you do every match."
  };
  const ai = getAIClient();
  if (!ai) return res.json(fallback);
  try {
    const matchSummaries = stats.matches?.slice(0, 5).map(m => summarizeMatch(m, stats.name));
    const prompt = `Analyze my Valorant profile: Name: ${stats.name}#${stats.tag} Rank: ${stats.rank} Recent Matches: ${JSON.stringify(matchSummaries)}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: { 
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.9,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            archetype: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["title", "description"] },
            scoutingReport: { type: Type.OBJECT, properties: { rankLevel: { type: Type.STRING }, mechanical: { type: Type.STRING }, mental: { type: Type.STRING } }, required: ["rankLevel", "mechanical", "mental"] },
            crushingSummary: { type: Type.STRING }
          },
          required: ["archetype", "scoutingReport", "crushingSummary"]
        }
      }
    });
    res.json(JSON.parse(response.text));
  } catch (error) {
    const errorStr = String(error);
    const isInvalidKey = errorStr.includes('API_KEY_INVALID') || errorStr.includes('API key not valid');
    res.json({
      ...fallback,
      archetype: { ...fallback.archetype, description: isInvalidKey ? "Sua chave de API é inválida." : "Erro na API do Google." }
    });
  }
});

app.post('/api/gemini/analyzeMatch', async (req, res) => {
  const { match, playerStats, lang = 'en' } = req.body;
  const ai = getAIClient();
  if (!ai) return res.json({ text: "Config Error: API Key missing." });
  try {
    const summary = summarizeMatch(match, playerStats.name);
    const prompt = `Match Data Summary: ${JSON.stringify(summary)}\nUser: ${playerStats.name}. Analyze this horror show.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: { systemInstruction: getSystemInstruction(lang), temperature: 1 }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.json({ text: "This match was such a horror show that the AI gave up." });
  }
});

app.post('/api/gemini/chatWithAnalista', async (req, res) => {
  const { history, newMessage, stats, lang = 'en' } = req.body;
  const ai = getAIClient();
  if (!ai) return res.json({ text: "Config Error: API Key missing." });
  try {
    const contents = history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] }));
    contents.push({ role: 'user', parts: [{ text: newMessage }] });
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: contents,
      config: { systemInstruction: getSystemInstruction(lang), temperature: 0.9 }
    });
    res.json({ text: response.text });
  } catch (error) {
    res.json({ text: "Stop tiring me with your noob questions. Even the API is tired of you." });
  }
});

export default (req, res) => app(req, res);

// Add fallback routes just in case Vercel strips the /api prefix
app.post('/gemini/generateRoast', (req, res, next) => req.app._router.handle(Object.assign(req, { url: '/api' + req.url }), res, next));
app.post('/gemini/analyzeProfile', (req, res, next) => req.app._router.handle(Object.assign(req, { url: '/api' + req.url }), res, next));
app.post('/gemini/analyzeMatch', (req, res, next) => req.app._router.handle(Object.assign(req, { url: '/api' + req.url }), res, next));
app.post('/gemini/chatWithAnalista', (req, res, next) => req.app._router.handle(Object.assign(req, { url: '/api' + req.url }), res, next));
