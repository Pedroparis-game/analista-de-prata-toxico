const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const loginScreenRegex = /<motion\.div\s*key="login"[\s\S]*?\{t\.login\.footer\}\n\s*<\/p>\n\s*<\/div>\n\s*<\/div>\n\s*<\/motion\.div>[\s\S]*?<\/motion\.div>/m;
const replacement = `<LoginScreen
        t={t}
        language={language}
        riotId={riotId}
        setRiotId={setRiotId}
        handleTrackerLogin={handleTrackerLogin}
        authLoading={authLoading}
        supabaseError={supabaseError}
        gtaWasted={gtaWasted}
        loginSuccessAnim={loginSuccessAnim}
      />`;

content = content.replace(loginScreenRegex, replacement);
content = content.replace(/import \{ LandingPage/, "import { LoginScreen } from './components/LoginScreen';\nimport { LandingPage");

fs.writeFileSync('src/App.tsx', content);
