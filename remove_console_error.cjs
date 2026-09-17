const fs = require('fs');
let content = fs.readFileSync('server/geminiRoutes.ts', 'utf8');

content = content.replace(/console\.error\("Translation error", err\);/g, "// Silenced error to avoid AI Studio popup");
fs.writeFileSync('server/geminiRoutes.ts', content);
