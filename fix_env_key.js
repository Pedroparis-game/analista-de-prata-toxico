import fs from 'fs';
let routes = fs.readFileSync('server/geminiRoutes.ts', 'utf-8');
routes = routes.replace(
    /const apiKey = process\.env\.GEMINI_API_KEY;/g,
    "const apiKey = process.env.GEMINI_API_kEY || process.env.GEMINI_API_KEY;"
);
fs.writeFileSync('server/geminiRoutes.ts', routes);
