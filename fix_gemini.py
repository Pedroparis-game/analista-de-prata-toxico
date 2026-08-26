import re

with open('src/lib/gemini.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix generateRoast
content = content.replace(
    "console.error('GEMINI API ERROR (generateRoast):', error);",
    """console.error('GEMINI API ERROR (generateRoast):', error);
    
    const errorStr = typeof error === 'object' ? JSON.stringify(error) : String(error);
    const isQuota = errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota');
    if (isQuota) {
      return lang === 'pt' ? "O analista está em cooldown. A cota da API estourou de tanto analisar ruindade (Erro 429)." : "The analyst is on cooldown. API quota exceeded from analyzing so much garbage (Error 429).";
    }"""
)

# Fix analyzeProfile
content = content.replace(
    "const isQuotaError = error.message?.includes('RESOURCE_EXHAUSTED') || error.status === 429;",
    """const errorStr = typeof error === 'object' ? JSON.stringify(error) : String(error);
    const isQuotaError = errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota');"""
)

# Fix analyzeMatch
content = content.replace(
    "console.error('GEMINI API ERROR (analyzeMatch):', error);",
    """console.error('GEMINI API ERROR (analyzeMatch):', error);
    const errorStr = typeof error === 'object' ? JSON.stringify(error) : String(error);
    if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota')) {
      return lang === 'pt' ? "A cota da API acabou (Erro 429)." : "API quota exceeded (Error 429).";
    }"""
)

# Fix chatWithAnalista
content = content.replace(
    "console.error('GEMINI API ERROR (chat):', error);",
    """console.error('GEMINI API ERROR (chat):', error);
    const errorStr = typeof error === 'object' ? JSON.stringify(error) : String(error);
    if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota')) {
      return lang === 'pt' ? "Estou sem paciência e sem cota na API (Erro 429). Volte amanhã." : "I'm out of patience and API quota (Error 429). Come back tomorrow.";
    }"""
)

with open('src/lib/gemini.ts', 'w', encoding='utf-8') as f:
    f.write(content)
