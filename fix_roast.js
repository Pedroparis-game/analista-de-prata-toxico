import fs from 'fs';
let content = fs.readFileSync('src/lib/gemini.ts', 'utf-8');
content = content.replace(
  'body: JSON.stringify({ userInput, playerStats, lang })',
  'body: JSON.stringify({ userInput, playerStats: playerStats ? { name: playerStats.name, rank: playerStats.rank } : null, lang })'
);
fs.writeFileSync('src/lib/gemini.ts', content);
