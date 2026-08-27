import fs from 'fs';
let content = fs.readFileSync('src/lib/gemini.ts', 'utf-8');

const cleanupFunction = `
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
`;

content = cleanupFunction + "\n" + content;

content = content.replace(
  'body: JSON.stringify({ stats: { ...stats, matches: stats.matches?.slice(0, 5).map(m => ({ metadata: m.metadata, players: { all_players: m.players?.all_players?.map(p => ({ name: p.name, team: p.team, character: p.character, stats: p.stats })) }, teams: m.teams })) }, lang })',
  'body: JSON.stringify({ stats: { ...stats, matches: stats.matches?.slice(0, 5).map((m: any) => cleanMatchData(m, stats.name)) }, lang })'
);

content = content.replace(
  'body: JSON.stringify({ match, playerStats, lang })',
  'body: JSON.stringify({ match: cleanMatchData(match, playerStats.name), playerStats, lang })'
);

fs.writeFileSync('src/lib/gemini.ts', content);
