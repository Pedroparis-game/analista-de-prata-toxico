const fs = require('fs');
let content = fs.readFileSync('src/components/ScanningAnalysisScreen.tsx', 'utf8');

const replacement = `src={typeof player.card === 'string' ? player.card : (player.card?.large || player.card?.small || "https://picsum.photos/seed/val/400/400")} `;

content = content.replace(/src=\{player\.card \|\| "https:\/\/picsum\.photos\/seed\/val\/400\/400"\} /g, replacement);

fs.writeFileSync('src/components/ScanningAnalysisScreen.tsx', content);
