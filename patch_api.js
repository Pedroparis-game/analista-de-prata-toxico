import fs from 'fs';
let content = fs.readFileSync('api/index.ts', 'utf-8');
content = content.replace(
  'isInvalidKey ? "Sua chave de API é inválida." : "Erro na API do Google."',
  '"ERRO VERCEL: " + errorStr'
);
fs.writeFileSync('api/index.ts', content);
