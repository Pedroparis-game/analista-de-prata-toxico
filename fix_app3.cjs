const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<ChatPanel chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} handleChatSubmit={handleChatSubmit} analyzing={analyzing} t={t} />',
  `<ChatPanel chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} handleChatSubmit={handleChatSubmit} analyzing={analyzing} t={t} />
        </div>
      </main>`
);

fs.writeFileSync('src/App.tsx', content);
