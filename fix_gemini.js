import fs from 'fs';
let content = fs.readFileSync('src/lib/gemini.ts', 'utf-8');
content = content.replace(
  'const fallback = {',
  'const getFallback = (errMsg = "The analyst is currently offline.") => ({'
);
content = content.replace(
  'archetype: { title: "SYSTEM ERROR", description: "ERRO FETCH: " + String(err) },',
  'archetype: { title: "SYSTEM ERROR", description: errMsg },'
);
content = content.replace(
  'crushingSummary: "The system tilted. Just like you do every match."\n  };',
  'crushingSummary: "The system tilted. Just like you do every match."\n  });'
);
content = content.replace(
  'return fallback;',
  'return getFallback("ERRO: " + String(err));'
);
content = content.replace(
  'if (!ai) return res.json(fallback);',
  'if (!ai) return res.json(getFallback());'
);
fs.writeFileSync('src/lib/gemini.ts', content);
