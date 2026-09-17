const fs = require('fs');
let content = fs.readFileSync('server/geminiRoutes.ts', 'utf8');

content = content.replace(/console\.error\("------ ACTUAL GEMINI ERROR ------", error\);/g, '// Error logged gracefully in UI');

fs.writeFileSync('server/geminiRoutes.ts', content);
