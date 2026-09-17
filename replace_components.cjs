const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. ScanningAnalysisScreen
const analysisStart = content.indexOf('<motion.div\n          key="analysis"');
if (analysisStart === -1) console.log('analysisStart not found');
// The end is before: <motion.div\n          key="dashboard"
const dashboardStart = content.indexOf('<motion.div\n          key="dashboard"');
if (dashboardStart === -1) console.log('dashboardStart not found');
const beforeAnalysis = content.substring(0, analysisStart);
const afterAnalysis = content.substring(dashboardStart);
const analysisReplacement = `<ScanningAnalysisScreen
          player={player!}
          analysisProgress={analysisProgress}
          analyzing={analyzing}
          profileAnalysis={profileAnalysis}
          setShowAnalysisScreen={setShowAnalysisScreen}
          t={t}
        />\n      ) : (\n        `;
content = beforeAnalysis + analysisReplacement + afterAnalysis;

// 2. ProfileAnalysisCard
const profileStart = content.indexOf('{/* Profile Analysis */}');
const roastStart = content.indexOf('<AnimatePresence>\n              {(loading || lastRoast) && (');
if (profileStart === -1 || roastStart === -1) console.log('Profile or Roast start not found');
const beforeProfile = content.substring(0, profileStart);
const afterProfile = content.substring(roastStart);
const profileReplacement = `{/* Profile Analysis */}
            <ProfileAnalysisCard analyzing={analyzing} profileAnalysis={profileAnalysis} t={t} />\n\n            `;
content = beforeProfile + profileReplacement + afterProfile;

// 3. RoastCard
const newRoastStart = content.indexOf('<AnimatePresence>\n              {(loading || lastRoast) && (');
const valDecorativeStart = content.indexOf('{/* Valorant decorative elements */}');
if (newRoastStart === -1 || valDecorativeStart === -1) console.log('Roast ends not found');
const beforeRoast = content.substring(0, newRoastStart);
const afterRoast = content.substring(valDecorativeStart);
const roastReplacement = `<RoastCard loading={loading} lastRoast={lastRoast} triggerShake={triggerShake} setLastRoast={setLastRoast} setInput={setInput} t={t} />\n\n                `;
content = beforeRoast + roastReplacement + afterRoast;

// 4. ChatPanel
const chatStart = content.indexOf('{/* Bottom Section: Chat */}');
if (chatStart === -1) console.log('Chat start not found');
// The end of the file is just closing tags, we can just find where Chat ends
const beforeChat = content.substring(0, chatStart);
const chatReplacement = `{/* Bottom Section: Chat */}
        <ChatPanel chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} handleChatSubmit={handleChatSubmit} analyzing={analyzing} t={t} />
      </main>
    </motion.div>
  );
}`;
content = beforeChat + chatReplacement;

// 5. Imports
const importLines = `import { ScanningAnalysisScreen } from './components/ScanningAnalysisScreen';
import { ProfileAnalysisCard } from './components/ProfileAnalysisCard';
import { RoastCard } from './components/RoastCard';
import { ChatPanel } from './components/ChatPanel';\n`;
content = content.replace(/import \{ LoginScreen/, importLines + "import { LoginScreen");

fs.writeFileSync('src/App.tsx', content);
