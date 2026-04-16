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
            { text: query }
          ]
        }
      ]
    };

    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('AI API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
