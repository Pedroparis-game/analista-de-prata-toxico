const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<motion\.div\s*initial=\{\{ opacity: 0, y: 10 \}\}[\s\S]*?<\/motion\.div>/m;
const replacement = `<MatchDetailsPanel
              player={player}
              selectedMatch={selectedMatch}
              agentData={agentData}
              language={language}
              t={t}
            />`;

content = content.replace(regex, replacement);
content = content.replace(/import \{ MatchHistoryPanel/, "import { MatchDetailsPanel } from './components/MatchDetailsPanel';\nimport { MatchHistoryPanel");

fs.writeFileSync('src/App.tsx', content);
