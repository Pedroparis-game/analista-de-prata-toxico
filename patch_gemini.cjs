const fs = require('fs');
const content = fs.readFileSync('server/geminiRoutes.ts', 'utf8');

const newContent = content.replace(
  'console.error("RAW API ERROR:", errorStr); const isInvalidKey = errorStr.includes(\'API_KEY_INVALID\') || errorStr.includes(\'API key not valid\') || errorStr.includes(\'400\');',
  'const isInvalidKey = false;'
).replace(
  'const quotaMsg = lang === \'pt\'',
  'const quotaMsg = errorStr; // TEMPORARY TO SEE ERROR IN UI'
).replace(
  '(isQuotaError ? quotaMsg : (lang === \'pt\' ? "O sistema crashou analisando sua gameplay." : "System crashed analyzing your gameplay."))',
  'errorStr'
);

fs.writeFileSync('server/geminiRoutes.ts', newContent);
