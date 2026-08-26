export async function generateRoast(userInput: string, playerStats?: any, lang: string = 'en') {
  try {
    const res = await fetch('/api/gemini/generateRoast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput, playerStats, lang })
    });
    const data = await res.json();
    return data.text;
  } catch (err) {
    console.warn("Error calling local gemini proxy:", err);
    return lang === 'pt' ? "Erro na comunicação com o servidor de IA." : "Error communicating with AI server.";
  }
}

export async function analyzeProfile(stats: any, lang: string = 'en') {
  const fallback = {
    archetype: { title: "SYSTEM ERROR", description: "The analyst is currently offline." },
    scoutingReport: { rankLevel: "N/A", mechanical: "TERMINAL FAILURE", mental: "COMATOSE" },
    crushingSummary: "The system tilted. Just like you do every match."
  };
  
  try {
    const res = await fetch('/api/gemini/analyzeProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stats, lang })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Error calling local gemini proxy:", err);
    return fallback;
  }
}

export async function analyzeMatch(match: any, playerStats: any, lang: string = 'en') {
  try {
    const res = await fetch('/api/gemini/analyzeMatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ match, playerStats, lang })
    });
    const data = await res.json();
    return data.text;
  } catch (err) {
    console.warn("Error calling local gemini proxy:", err);
    return lang === 'pt' ? "Essa partida foi um show de horrores tão grande que a IA desistiu." : "This match was such a horror show that the AI gave up.";
  }
}

export async function chatWithAnalista(history: any[], newMessage: string, stats: any, lang: string = 'en') {
  try {
    const res = await fetch('/api/gemini/chatWithAnalista', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, newMessage, stats, lang })
    });
    const data = await res.json();
    return data.text;
  } catch (err) {
    console.warn("Error calling local gemini proxy:", err);
    return lang === 'pt' ? "Pare de me cansar com suas perguntas de noob. Até a API cansou de você." : "Stop tiring me with your noob questions. Even the API is tired of you.";
  }
}

export async function translateAppState(stateObj: any, targetLang: string) {
  // Not used right now but keeps signature
  return stateObj;
}
