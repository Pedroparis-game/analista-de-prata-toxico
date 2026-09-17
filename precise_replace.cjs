const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = '{/* Selected Match Analysis & Telemetry */}';
const endMarker = '{/* Bottom Section: Chat */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = content.substring(0, startIndex);
  const after = content.substring(endIndex);
  const newBlock = `{/* Selected Match Analysis & Telemetry */}
        <AnimatePresence>
          {selectedMatch && (
            <MatchDetailsPanel
              player={player}
              selectedMatch={selectedMatch}
              agentData={agentData}
              language={language}
              t={t}
            />
          )}
        </AnimatePresence>

        `;
  
  let newContent = before + newBlock + after;
  if (!newContent.includes('import { MatchDetailsPanel }')) {
    newContent = newContent.replace(/import \{ MatchHistoryPanel/, "import { MatchDetailsPanel } from './components/MatchDetailsPanel';\nimport { MatchHistoryPanel");
  }
  
  fs.writeFileSync('src/App.tsx', newContent);
  console.log("Replaced successfully!");
} else {
  console.log("Markers not found");
}
