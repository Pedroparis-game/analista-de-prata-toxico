const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/;\n  scoutingReport: \{ rankLevel: string, mechanical: string, mental: string \};\n  crushingSummary: string;\n\}/m, '');
fs.writeFileSync('src/App.tsx', content);
