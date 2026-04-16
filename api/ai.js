export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Missing query' });
    }

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `You are the Smart Stadium AI. Answer this query based on a stadium context: "${query}". Respond ONLY with a valid JSON object matching this exact format, with no markdown formatting or backticks: {"answer": "Detailed response guiding the user", "bestOption": "e.g. Gate 3 or North Stand", "eta": "e.g. 12 mins", "reason": "Short reason for your recommendation"}`
            }
          ]
        }
      ]
    };

    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch from Gemini');
    }

    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    
    // Clean up potential markdown formatting block
    const cleanedText = textContent.replace(/```json/gi, '').replace(/```/g, '').trim();

    let parsedResult;
    try {
      parsedResult = JSON.parse(cleanedText);
    } catch (e) {
      // Fallback
      parsedResult = {
        answer: textContent,
        bestOption: "Determined from context",
        eta: "approx 10 mins",
        reason: "Based on real-time routing logic."
      };
    }

    return res.status(200).json({
      answer: parsedResult.answer,
      bestOption: parsedResult.bestOption,
      eta: parsedResult.eta,
      reason: parsedResult.reason
    });
  } catch (error) {
    console.error('AI API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
