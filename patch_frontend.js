import fs from 'fs';
let content = fs.readFileSync('src/lib/gemini.ts', 'utf-8');
content = content.replace(
  'description: "The analyst is currently offline."',
  'description: "ERRO FETCH: " + String(err)'
);
fs.writeFileSync('src/lib/gemini.ts', content);
