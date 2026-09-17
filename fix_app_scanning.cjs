const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<motion\.div\s*key="analysis"[\s\S]*?<\/motion\.div>/m;
const replacement = `<ScanningAnalysisScreen
          player={player!}
          analysisProgress={analysisProgress}
          analyzing={analyzing}
          profileAnalysis={profileAnalysis}
          setShowAnalysisScreen={setShowAnalysisScreen}
          t={t}
        />`;

content = content.replace(regex, replacement);
content = content.replace(/import \{ LoginScreen/, "import { ScanningAnalysisScreen } from './components/ScanningAnalysisScreen';\nimport { LoginScreen");

fs.writeFileSync('src/App.tsx', content);
