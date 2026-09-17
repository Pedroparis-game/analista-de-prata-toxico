const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `src={typeof player.card === 'string' ? player.card : (player.card?.large || player.card?.small || "https://picsum.photos/seed/val/400/400")}`;

content = content.replace(/src=\{player\.card\}/g, replacement);

fs.writeFileSync('src/App.tsx', content);
