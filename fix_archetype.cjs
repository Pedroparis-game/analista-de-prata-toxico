const fs = require('fs');
let content = fs.readFileSync('src/components/ProfileAnalysisCard.tsx', 'utf8');

content = content.replace(
  '<h3 className="font-display text-2xl italic tracking-tight uppercase leading-none">{profileAnalysis.archetype.title}</h3>',
  '<h3 className="font-display text-2xl italic tracking-tight uppercase leading-none mb-2">{profileAnalysis.archetype.title}</h3>\n                  <p className="font-mono text-[9px] text-[#ece8e1]/70 leading-relaxed uppercase">{profileAnalysis.archetype.description}</p>'
);

fs.writeFileSync('src/components/ProfileAnalysisCard.tsx', content);
