fetch('http://localhost:3000/api/gemini/analyzeProfile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ stats: { name: 'test', tag: '123', rank: 'Gold 1', matches: [] }, lang: 'en' })
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
