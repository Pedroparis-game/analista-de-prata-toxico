
const cleanMatchData = (m: any, playerName: string) => {
  if (!m) return null;
  const p = m.players?.all_players?.find((x: any) => x.name.toLowerCase() === playerName.toLowerCase());
  return {
    metadata: m.metadata,
    teams: m.teams,
    players: {
      all_players: p ? [{ name: p.name, team: p.team, character: p.character, stats: p.stats }] : []
    }
  };
};

export async function generateRoast(userInput: string, playerStats?: any, lang: string = 'en') {
  try {
    const res = await fetch('/api/gemini/generateRoast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput, playerStats: playerStats ? { name: playerStats.name, rank: playerStats.rank } : null, lang })
    });
    const data = await res.json();
    return data.text;
  } catch (err) {
    console.warn("Error calling local gemini proxy:", err);
    return lang === 'pt' ? "Erro na comunicação com o servidor de IA." : "Error communicating with AI server.";
  }
}

export async function analyzeProfile(stats: any, lang: string = 'en') {
  const getFallback = (errMsg = "The analyst is currently offline.") => ({
    archetype: { title: "SYSTEM ERROR", description: errMsg },
    scoutingReport: { rankLevel: "N/A", mechanical: "TERMINAL FAILURE", mental: "COMATOSE" },
    crushingSummary: "The system tilted. Just like you do every match."
  });
  
  try {
    const res = await fetch('/api/gemini/analyzeProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stats: { ...stats, matches: stats.matches?.slice(0, 5).map((m: any) => cleanMatchData(m, stats.name)) }, lang })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Error calling local gemini proxy:", err);
    return getFallback("ERRO: " + String(err));
  }
}

export async function analyzeMatch(match: any, playerStats: any, lang: string = 'en') {
  try {
    const res = await fetch('/api/gemini/analyzeMatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ match: cleanMatchData(match, playerStats.name), playerStats, lang })
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
      body: JSON.stringify({ history, newMessage, stats: { name: stats.name, tag: stats.tag, rank: stats.rank }, lang })
    });
    const data = await res.json();
    return data.text;
  } catch (err) {
    console.warn("Error calling local gemini proxy:", err);
    return lang === 'pt' ? "Pare de me cansar com suas perguntas de noob. Até a API cansou de você." : "Stop tiring me with your noob questions. Even the API is tired of you.";
  }
}

export async function translateAppState(stateObj: any, targetLang: string) {
  try {
    const res = await fetch('/api/gemini/translateAppState', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stateObj, targetLang })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Error calling translation:", err);
    return stateObj;
  }
}
