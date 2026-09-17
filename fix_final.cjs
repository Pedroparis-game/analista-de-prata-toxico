const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. ScanningAnalysisScreen
let part1 = content.split('<motion.div\n          key="analysis"');
let part2 = part1[1].split('<motion.div\n          key="dashboard"');
const analysisReplacement = `<ScanningAnalysisScreen
          player={player!}
          analysisProgress={analysisProgress}
          analyzing={analyzing}
          profileAnalysis={profileAnalysis}
          setShowAnalysisScreen={setShowAnalysisScreen}
          t={t}
        />\n      ) : (\n        <motion.div\n          key="dashboard"`;
content = part1[0] + analysisReplacement + part2[1];

// 2 & 3. ProfileAnalysis and Roast
const paIndex = content.indexOf('{/* Profile Analysis */}');
const rightIndex = content.indexOf('{/* Right Column: Match History */}');
const paBefore = content.substring(0, paIndex);
const paAfter = content.substring(rightIndex);
const paReplacement = `{/* Profile Analysis */}
            <ProfileAnalysisCard analyzing={analyzing} profileAnalysis={profileAnalysis} t={t} />
            <RoastCard loading={loading} lastRoast={lastRoast} triggerShake={triggerShake} setLastRoast={setLastRoast} setInput={setInput} t={t} />
          </div>

          `;
content = paBefore + paReplacement + paAfter;

// 4. ChatPanel
const chatIndex = content.indexOf('{/* Chat with Analista */}');
const footerIndex = content.indexOf('{/* Footer */}');
const cpBefore = content.substring(0, chatIndex);
const cpAfter = content.substring(footerIndex);
const chatReplacement = `<ChatPanel chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} handleChatSubmit={handleChatSubmit} analyzing={analyzing} t={t} />\n\n        `;
content = cpBefore + chatReplacement + cpAfter;

// 5. Imports
const importLines = `import { ScanningAnalysisScreen } from './components/ScanningAnalysisScreen';
import { ProfileAnalysisCard } from './components/ProfileAnalysisCard';
import { RoastCard } from './components/RoastCard';
import { ChatPanel } from './components/ChatPanel';\n`;
content = content.replace(/import \{ LoginScreen/, importLines + "import { LoginScreen");

fs.writeFileSync('src/App.tsx', content);
