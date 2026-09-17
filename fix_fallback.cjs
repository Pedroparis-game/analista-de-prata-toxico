const fs = require('fs');
let content = fs.readFileSync('server/geminiRoutes.ts', 'utf8');

// I need to make sure we don't accidentally fallback to the "invalid key" message anymore.
content = content.replace(
  'isInvalidKey\n           ? (lang === \'pt\' ? "Sua chave de API é inválida. Nem o sistema quer olhar pra você. Vá nas configurações do AI Studio (ícone de engrenagem) e coloque uma válida." : "Your API key is invalid. System refuses to look at you. Go to AI Studio settings (gear icon) and set a valid key.")\n          : errorStr',
  'errorStr'
);

fs.writeFileSync('server/geminiRoutes.ts', content);
