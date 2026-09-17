import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/profile/:name/:tag', async (req, res) => {
  const { name, tag } = req.params;
  const apiKey = process.env.HENRIK_API_KEY;
  const headers = apiKey ? { Authorization: apiKey } : {};

  try {
    const accRes = await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`, { headers });
    const region = accRes.data?.data?.region || 'br';
    
    const mmrRes = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`, { headers });
    
    let matches = [];
    try {
      const matchesRes = await axios.get(`https://api.henrikdev.xyz/valorant/v3/matches/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`, { headers });
      matches = matchesRes.data?.data || [];
    } catch (err) {
      console.warn("Matches not found for this profile.");
    }

    res.json({
      name: accRes.data.data.name,
      tag: accRes.data.data.tag,
      level: accRes.data.data.account_level,
      card: accRes.data.data.card?.large || accRes.data.data.card?.small || "https://picsum.photos/seed/val/400/400",
      region,
      rank: mmrRes.data?.data?.currenttierpatched || 'Unknown',
      mmr: mmrRes.data?.data?.elo || 0,
      matches
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Player not found' });
    }
    console.error("Henrik API Error:", error.message);
    res.status(500).json({ error: 'Failed to fetch player stats' });
  }
});

export default router;
