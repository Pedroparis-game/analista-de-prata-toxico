export interface PlayerStats {
  name: string;
  tag: string;
  level: number;
  card: string;
  region: string;
  rank: string;
  mmr: number;
  matches: any[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'analyst';
  text: string;
}

export interface ProfileAnalysisResult {
  archetype: {
    title: string;
    description: string;
  };
  scoutingReport: {
    rankLevel: string;
    mechanical: string;
    mental: string;
  };
  crushingSummary: string;
}
