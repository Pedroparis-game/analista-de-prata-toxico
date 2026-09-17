const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<div className="space-y-10">\s*\{\/\* Match History \*\/\}\s*<div className="val-card">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/m;
const replacement = `          <MatchHistoryPanel
            player={player}
            selectedMatch={selectedMatch}
            handleMatchSelect={handleMatchSelect}
            t={t}
          />
        </div>`;

content = content.replace(regex, replacement);
content = content.replace(/import \{ LoginScreen/, "import { MatchHistoryPanel } from './components/MatchHistoryPanel';\nimport { LoginScreen");

fs.writeFileSync('src/App.tsx', content);
