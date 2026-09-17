const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. ScanningAnalysisScreen
// Matches from <motion.div key="analysis" to just before <motion.div key="dashboard"
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

// 2 & 3. ProfileAnalysisCard and RoastCard
// We'll replace the chunk from {/* Profile Analysis */} up to {/* Valorant decorative elements */}
let pa1 = content.split('{/* Profile Analysis */}');
let pa2 = pa1[1].split('{/* Valorant decorative elements */}');
const profileAndRoast = `{/* Profile Analysis */}
            <ProfileAnalysisCard analyzing={analyzing} profileAnalysis={profileAnalysis} t={t} />

            <RoastCard loading={loading} lastRoast={lastRoast} triggerShake={triggerShake} setLastRoast={setLastRoast} setInput={setInput} t={t} />

            {/* Valorant decorative elements */}`;
content = pa1[0] + profileAndRoast + pa2[1];

// 4. ChatPanel
// Replace from {/* Bottom Section: Chat */} up to {/* Footer */}
let cp1 = content.split('{/* Bottom Section: Chat */}');
let cp2 = cp1[1].split('{/* Footer */}');
const chatPanel = `{/* Bottom Section: Chat */}
        <ChatPanel chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} handleChatSubmit={handleChatSubmit} analyzing={analyzing} t={t} />

        {/* Footer */}`;
content = cp1[0] + chatPanel + cp2[1];

// 5. Imports
const importLines = `import { ScanningAnalysisScreen } from './components/ScanningAnalysisScreen';
import { ProfileAnalysisCard } from './components/ProfileAnalysisCard';
import { RoastCard } from './components/RoastCard';
import { ChatPanel } from './components/ChatPanel';\n`;
content = content.replace(/import \{ LoginScreen/, importLines + "import { LoginScreen");

fs.writeFileSync('src/App.tsx', content);
