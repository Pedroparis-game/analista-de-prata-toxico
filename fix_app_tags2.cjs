const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// I will just replace from {/\* Profile Analysis \*/} to Right Column: Match History
const startMarker = '{/* Profile Analysis */}';
const endMarker = '{/* Right Column: Match History */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

const newBlock = `{/* Profile Analysis */}
            <ProfileAnalysisCard analyzing={analyzing} profileAnalysis={profileAnalysis} t={t} />

            <RoastCard loading={loading} lastRoast={lastRoast} triggerShake={triggerShake} setLastRoast={setLastRoast} setInput={setInput} t={t} />
          </div>

          `;

content = before + newBlock + after;
fs.writeFileSync('src/App.tsx', content);
