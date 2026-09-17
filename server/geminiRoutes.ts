import express from 'express';
import { GoogleGenAI, Type } from "@google/genai";

const router = express.Router();

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

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

function summarizeMatch(match: any, playerName: string) {
  if (!match) return null;
  const player = match.players?.all_players?.find((p: any) => p.name === playerName);
  const isWin = match.metadata?.mode === 'Deathmatch' ? false : (match.teams?.red?.has_won && player?.team === 'Red') || (match.teams?.blue?.has_won && player?.team === 'Blue');
  
  return {
    map: match.metadata?.map,
    mode: match.metadata?.mode,
    character: player?.character,
    result: isWin ? 'Win' : 'Loss',
    kda: player?.stats ? `${player.stats.kills}/${player.stats.deaths}/${player.stats.assists}` : 'N/A',
    score: player?.stats?.score,
    damage: player?.damage_made
  };
}

router.post('/generateRoast', async (req, res) => {
  const { userInput, playerStats, lang = 'en' } = req.body;
  const ai = getAIClient();
  if (!ai) return res.json({ text: lang === 'pt' ? "Erro de Configuração: Chave API ausente." : "Config Error: API Key missing." });

  try {
    const contextStr = playerStats ? `\nUser Context: Name ${playerStats.name}#${playerStats.tag}, Rank: ${playerStats.rank}.` : '';
    const prompt = `${lang === 'en' ? 'OBLIGATORY: RESPONSE IN ENGLISH' : 'OBRIGATÓRIO: RESPOSTA EM PORTUGUÊS'}\n\nRoast this user's comment/play style: "${userInput}"${contextStr}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt + `\n\n(IMPORTANT: RESPOND EVERYTHING IN ${lang === 'pt' ? 'PORTUGUESE' : 'ENGLISH'})`,
      config: { 
        systemInstruction: getSystemInstruction(lang) + `\n\nIMPORTANT: PROVIDE A SHORT ROAST. RESPOND ONLY IN ${lang === 'pt' ? 'PORTUGUESE (PT-BR)' : 'ENGLISH'}.`,
        temperature: 1 
      },
    });

    if (!response?.text) {
      throw new Error("Empty response from Gemini API");
    }
    res.json({ text: response.text });
  } catch (error: any) {
    // Error logged gracefully in UI
    const errorStr = error?.message || String(error);
    const isInvalidKey = false;
    if (isInvalidKey) {
      return res.json({ text: lang === 'pt' ? "Erro: Sua chave de API é tão ruim quanto sua mira (Inválida). Vá nas configurações do AI Studio e coloque uma válida." : "Error: Your API key is as bad as your aim (Invalid). Go to AI Studio settings and set a valid one." });
    }
    if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota')) {
      return res.json({ text: lang === 'pt' ? "O analista está em cooldown. A cota da API estourou de tanto analisar ruindade (Erro 429)." : "The analyst is on cooldown. API quota exceeded from analyzing so much garbage (Error 429)." });
    }
    return res.json({ text: lang === 'pt' ? "Parabéns, você quebrou a IA com sua ruindade." : "Congratulations, you broke the AI with your badness." });
  }
});

router.post('/analyzeProfile', async (req, res) => {
  const { stats, lang = 'en' } = req.body;
  const ai = getAIClient();
  
  const fallback = {
    archetype: { title: "SYSTEM ERROR", description: "The analyst is currently offline." },
    scoutingReport: { rankLevel: "N/A", mechanical: "TERMINAL FAILURE", mental: "COMATOSE" },
    crushingSummary: "The system tilted. Just like you do every match."
  };

  if (!ai) return res.json(fallback);

  try {
    const matchSummaries = stats.matches?.slice(0, 5).map((m: any) => summarizeMatch(m, stats.name));
    const prompt = `${lang === 'en' ? 'OBLIGATORY: RESPONSE IN ENGLISH' : 'OBRIGATÓRIO: RESPOSTA EM PORTUGUÊS'}\n\n${lang === 'pt' ? 'Analise meu perfil de Valorant' : 'Analyze my Valorant profile'}:
Name: ${stats.name}#${stats.tag}
Rank: ${stats.rank}
Recent Match Summaries: ${JSON.stringify(matchSummaries)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt + `\n\n(IMPORTANT: RESPOND EVERYTHING IN ${lang === 'pt' ? 'PORTUGUESE' : 'ENGLISH'})`,
      config: { 
        systemInstruction: getSystemInstruction(lang) + `\n\nIMPORTANT: YOU ARE A DEEP SCOUTING SYSTEM. PROVIDE A STRUCTURED ANALYSIS. RESPOND ONLY IN ${lang === 'pt' ? 'PORTUGUESE (PT-BR)' : 'ENGLISH'}.`,
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

    const parsed = JSON.parse(response.text!);
    res.json(parsed);
  } catch (error: any) {
    // Error logged gracefully in UI
    const errorStr = error?.message || String(error);
    const isQuotaError = errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota');
    const isInvalidKey = errorStr.includes('API_KEY_INVALID') || errorStr.includes('API key not valid') ;
    const quotaMsg = errorStr; // TEMPORARY TO SEE ERROR IN UI 
       
      
    
    res.json({
      ...fallback,
      archetype: { 
        ...fallback.archetype, 
        description: isInvalidKey 
          ? (lang === 'pt' ? "Sua chave de API é inválida. Nem o sistema quer olhar pra você. Vá nas configurações do AI Studio (ícone de engrenagem) e coloque uma válida." : "Your API key is invalid. System refuses to look at you. Go to AI Studio settings (gear icon) and set a valid key.")
          : errorStr 
      }
    });
  }
});

router.post('/analyzeMatch', async (req, res) => {
  const { match, playerStats, lang = 'en' } = req.body;
  const ai = getAIClient();
  if (!ai) return res.json({ text: lang === 'pt' ? "Erro de Configuração: Chave API ausente." : "Config Error: API Key missing." });

  try {
    const summary = summarizeMatch(match, playerStats.name);
    const prompt = `${lang === 'en' ? 'OBLIGATORY: RESPONSE IN ENGLISH' : 'OBRIGATÓRIO: RESPOSTA EM PORTUGUÊS'}\n\nMatch Data Summary: ${JSON.stringify(summary)}\nUser: ${playerStats.name}#${playerStats.tag}. Analyze this horror show. Include details about their character and score.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt + `\n\n(IMPORTANT: RESPOND EVERYTHING IN ${lang === 'pt' ? 'PORTUGUESE' : 'ENGLISH'})`,
      config: { 
        systemInstruction: getSystemInstruction(lang) + `\n\nIMPORTANT: PROVIDE A DETAILED AND TOXIC MATCH RECAP. RESPOND ONLY IN ${lang === 'pt' ? 'PORTUGUESE (PT-BR)' : 'ENGLISH'}.`,
        temperature: 1 
      },
    });
    res.json({ text: response.text });
  } catch (error: any) {
    // Error logged gracefully in UI
    const errorStr = error?.message || String(error);
    const isInvalidKey = errorStr.includes('API_KEY_INVALID') || errorStr.includes('API key not valid') ;
    if (isInvalidKey) {
      return res.json({ text: lang === 'pt' ? "Erro: Sua chave de API é tão ruim quanto sua mira (Inválida). Vá nas configurações do AI Studio e coloque uma válida." : "Error: Your API key is as bad as your aim (Invalid). Go to AI Studio settings and set a valid one." });
    }
    if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota')) {
      return res.json({ text: lang === 'pt' ? "A cota da API acabou (Erro 429)." : "API quota exceeded (Error 429)." });
    }
    res.json({ text: lang === 'pt' ? "Essa partida foi um show de horrores tão grande que a IA desistiu." : "This match was such a horror show that the AI gave up." });
  }
});

router.post('/chatWithAnalista', async (req, res) => {
  const { history, newMessage, stats, lang = 'en' } = req.body;
  const ai = getAIClient();
  if (!ai) return res.json({ text: lang === 'pt' ? "Erro de Configuração: Chave API ausente." : "Config Error: API Key missing." });

  try {
    const contents = history.map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: newMessage }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: contents,
      config: { 
        systemInstruction: getSystemInstruction(lang) + `\n\nUser Context: ${stats.name}#${stats.tag}, Rank ${stats.rank}. IMPORTANT: RESPOND ONLY IN ${lang === 'pt' ? 'PORTUGUESE (PT-BR)' : 'ENGLISH'}.`,
        temperature: 0.9 
      },
    });
    res.json({ text: response.text });
  } catch (error: any) {
    // Error logged gracefully in UI
    const errorStr = error?.message || String(error);
    const isInvalidKey = errorStr.includes('API_KEY_INVALID') || errorStr.includes('API key not valid') ;
    if (isInvalidKey) {
      return res.json({ text: lang === 'pt' ? "Erro: Sua chave de API é tão ruim quanto sua mira (Inválida). Vá nas configurações do AI Studio e coloque uma válida." : "Error: Your API key is as bad as your aim (Invalid). Go to AI Studio settings and set a valid one." });
    }
    if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota')) {
      return res.json({ text: lang === 'pt' ? "Estou sem paciência e sem cota na API (Erro 429). Volte amanhã." : "I'm out of patience and API quota (Error 429). Come back tomorrow." });
    }
    res.json({ text: lang === 'pt' ? "Pare de me cansar com suas perguntas de noob. Até a API cansou de você." : "Stop tiring me with your noob questions. Even the API is tired of you." });
  }
});



router.post('/translateAppState', async (req, res) => {
  const { stateObj, targetLang } = req.body;
  const ai = getAIClient();
  if (!ai) return res.json(stateObj);
  
  try {
    const prompt = `Translate the following JSON object's string values to ${targetLang === 'pt' ? 'Portuguese (PT-BR)' : 'English'}. Keep the JSON structure exactly the same, only translate the text content. Do not translate keys.

JSON to translate:
${JSON.stringify(stateObj)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: { 
        systemInstruction: "You are a direct JSON translator. You receive JSON and return the exact same JSON structure with values translated.",
        temperature: 0.1,
        responseMimeType: "application/json"
      },
    });
    
    const translated = JSON.parse(response.text!);
    res.json(translated);
  } catch (err) {
    // Silenced error to avoid AI Studio popup
    res.json(stateObj); // fallback to original
  }
});

export default router;

