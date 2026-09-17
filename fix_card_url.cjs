const fs = require('fs');
let content = fs.readFileSync('server/henrikRoutes.ts', 'utf8');

// Change card: accRes.data.data.card?.small to large, with fallback
content = content.replace(
  'card: accRes.data.data.card?.small,',
  'card: accRes.data.data.card?.large || accRes.data.data.card?.small || "https://picsum.photos/seed/val/400/400",'
);

fs.writeFileSync('server/henrikRoutes.ts', content);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  /typeof player\.card === 'string' \? player\.card : \(player\.card\?\.large \|\| player\.card\?\.small \|\| "https:\/\/picsum\.photos\/seed\/val\/400\/400"\)/g,
  'player.card || "https://picsum.photos/seed/val/400/400"'
);
fs.writeFileSync('src/App.tsx', appContent);

let scanContent = fs.readFileSync('src/components/ScanningAnalysisScreen.tsx', 'utf8');
scanContent = scanContent.replace(
  /typeof player\.card === 'string' \? player\.card : \(player\.card\?\.large \|\| player\.card\?\.small \|\| "https:\/\/picsum\.photos\/seed\/val\/400\/400"\)/g,
  'player.card || "https://picsum.photos/seed/val/400/400"'
);
fs.writeFileSync('src/components/ScanningAnalysisScreen.tsx', scanContent);

