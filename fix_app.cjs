const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Replace henrik API call
content = content.replace(
  /const apiKey = import\.meta\.env\.HENRIK_API_KEY;[\s\S]*?const stats: PlayerStats = \{/m,
  `try {
      const res = await axios.get(\`/api/henrik/profile/\${encodeURIComponent(name)}/\${encodeURIComponent(tag)}\`);
      
      const stats: PlayerStats = {`
);

content = content.replace(
  /region,\n\s*rank: mmrRes\.data\?\.data\?\.currenttierpatched \|\| t\.match\.unknownMap,\n\s*mmr: mmrRes\.data\?\.data\?\.elo \|\| 0,\n\s*matches\n\s*\};\n\n\s*setSupabaseError\(null\);/m,
  `...res.data
      };

      setSupabaseError(null);`
);

// 2. Types are now in src/types.ts
// Wait, we need to import them!
content = content.replace(/export default function App/m, `import { PlayerStats, ChatMessage, ProfileAnalysisResult } from './types';\n\nexport default function App`);

// 3. Remove local interfaces
content = content.replace(/interface PlayerStats \{[\s\S]*?\}/m, '');
content = content.replace(/interface ChatMessage \{[\s\S]*?\}/m, '');
content = content.replace(/interface ProfileAnalysisResult \{[\s\S]*?\}/m, '');

fs.writeFileSync('src/App.tsx', content);
