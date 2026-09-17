const axios = require('axios');
axios.post('http://localhost:3000/api/gemini/analyzeProfile', {
  stats: {
    name: "MADEIN HVEAN",
    tag: "goat",
    rank: "Diamond 1",
    matches: []
  },
  lang: "pt"
}).then(r => console.log(r.data)).catch(e => console.error(e.message));
