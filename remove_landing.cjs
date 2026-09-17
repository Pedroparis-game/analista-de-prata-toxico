const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace LandingPage with nothing
content = content.replace(/function LandingPage[\s\S]*?\n\}\n/m, '');

// Add import
content = content.replace(/import \{ PlayerStats/, "import { LandingPage } from './components/LandingPage';\nimport { PlayerStats");

fs.writeFileSync('src/App.tsx', content);
