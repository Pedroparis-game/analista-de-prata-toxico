import fs from 'fs';
let content = fs.readFileSync('src/lib/gemini.ts', 'utf-8');
content = content.replace(
  'body: JSON.stringify({ history, newMessage, stats, lang })',
  'body: JSON.stringify({ history, newMessage, stats: { name: stats.name, tag: stats.tag, rank: stats.rank }, lang })'
);
fs.writeFileSync('src/lib/gemini.ts', content);
