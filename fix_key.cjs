const fs = require('fs');
const content = fs.readFileSync('server/geminiRoutes.ts', 'utf8');

// The error handler in analyzeProfile is catching the invalid key error, 
// but it's checking for 'API_KEY_INVALID' and 'API key not valid'. 
// The actual error message from the new SDK might be slightly different.
// Let's log the raw error message to the console so we can see what's actually happening.

const newContent = content.replace(
  'const isInvalidKey = errorStr.includes(\'API_KEY_INVALID\') || errorStr.includes(\'API key not valid\') ;',
  'console.error("RAW API ERROR:", errorStr); const isInvalidKey = errorStr.includes(\'API_KEY_INVALID\') || errorStr.includes(\'API key not valid\') || errorStr.includes(\'400\');'
);

fs.writeFileSync('server/geminiRoutes.ts', newContent);
