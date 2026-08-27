import fs from 'fs';
let content = fs.readFileSync('src/lib/gemini.ts', 'utf-8');
content = content.replace(
  'body: JSON.stringify({ stats, lang })',
  'body: JSON.stringify({ stats: { ...stats, matches: stats.matches?.slice(0, 5).map(m => ({ metadata: m.metadata, players: { all_players: m.players?.all_players?.map(p => ({ name: p.name, team: p.team, character: p.character, stats: p.stats })) }, teams: m.teams })) }, lang })'
);
fs.writeFileSync('src/lib/gemini.ts', content);
