const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regexProfile = /<AnimatePresence>\s*\{\(analyzing \|\| profileAnalysis\) && \(\s*<motion\.div[\s\S]*?<\/AnimatePresence>/m;
content = content.replace(regexProfile, `<ProfileAnalysisCard analyzing={analyzing} profileAnalysis={profileAnalysis} t={t} />`);

const regexRoast = /<AnimatePresence>\s*\{\(loading \|\| lastRoast\) && \(\s*<motion\.div[\s\S]*?<\/AnimatePresence>/m;
content = content.replace(regexRoast, `<RoastCard loading={loading} lastRoast={lastRoast} triggerShake={triggerShake} setLastRoast={setLastRoast} setInput={setInput} t={t} />`);

const regexChat = /<div className="space-y-10">\s*\{\/\* Chat with Analista \*\/\}\s*<div className="val-card flex flex-col h-\[500px\]">[\s\S]*?<\/div>\s*<\/div>/m;
content = content.replace(regexChat, `<ChatPanel chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} handleChatSubmit={handleChatSubmit} analyzing={analyzing} t={t} />`);

let importLines = `import { ProfileAnalysisCard } from './components/ProfileAnalysisCard';
import { RoastCard } from './components/RoastCard';
import { ChatPanel } from './components/ChatPanel';
`;
content = content.replace(/import \{ ScanningAnalysisScreen/, importLines + "import { ScanningAnalysisScreen");

fs.writeFileSync('src/App.tsx', content);
