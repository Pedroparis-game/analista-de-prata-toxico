const fs = require('fs');
let content = fs.readFileSync('server/geminiRoutes.ts', 'utf8');

// replace JSON.stringify(error...) with error.message
content = content.replace(/typeof error === 'object' \? JSON\.stringify\(error, Object\.getOwnPropertyNames\(error\)\) : String\(error\)/g, "error?.message || String(error)");

fs.writeFileSync('server/geminiRoutes.ts', content);
