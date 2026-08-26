import fs from 'fs';
let routes = fs.readFileSync('server/geminiRoutes.ts', 'utf-8');
routes = routes.replace(
    /const errorStr = typeof error === 'object' \? JSON\.stringify\(error\) : String\(error\);/g,
    `console.error("------ ACTUAL GEMINI ERROR ------", error);
    const errorStr = typeof error === 'object' ? JSON.stringify(error, Object.getOwnPropertyNames(error)) : String(error);`
);
fs.writeFileSync('server/geminiRoutes.ts', routes);
