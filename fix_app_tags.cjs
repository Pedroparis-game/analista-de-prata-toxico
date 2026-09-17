const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// I just need to remove the extra </div> at the end of MatchHistoryPanel replacement.
content = content.replace(/<MatchHistoryPanel[\s\S]*?\/>\n        <\/div>\n        <\/div>/m, 
`<MatchHistoryPanel
            player={player}
            selectedMatch={selectedMatch}
            handleMatchSelect={handleMatchSelect}
            t={t}
          />
        </div>`);

fs.writeFileSync('src/App.tsx', content);
