const axios = require('axios');

async function test() {
  try {
    const res = await axios.get("https://api.henrikdev.xyz/valorant/v3/matches/br/MADEIN%20HVEAN/goat", {
      headers: { Authorization: process.env.HENRIK_API_KEY }
    });
    const matches = res.data.data;
    console.log("Got", matches.length, "matches");
    
    // now call gemini exactly like the app does
    const cleanMatchData = (m, playerName) => {
      if (!m) return null;
      const p = m.players?.all_players?.find(x => x.name.toLowerCase() === playerName.toLowerCase());
      return {
        metadata: m.metadata,
        teams: m.teams,
        players: {
          all_players: p ? [{ name: p.name, team: p.team, character: p.character, stats: p.stats }] : []
        }
      };
    };
    
    const cleaned = matches.slice(0, 5).map(m => cleanMatchData(m, "MADEIN HVEAN"));
    
    const geminiRes = await axios.post('http://localhost:3000/api/gemini/analyzeProfile', {
      stats: {
        name: "MADEIN HVEAN",
        tag: "goat",
        rank: "Diamond 1",
        matches: cleaned
      },
      lang: "pt"
    });
    console.log(geminiRes.data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
test();
