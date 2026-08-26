import fs from 'fs';
let routes = fs.readFileSync('server/geminiRoutes.ts', 'utf-8');
routes = routes.replace(
    /\|\| errorStr\.includes\('400'\)/g,
    ""
);
fs.writeFileSync('server/geminiRoutes.ts', routes);
