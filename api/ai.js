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
    
    // First attempt: try the standard v1beta 1.5 flash alias
    let modelName = 'gemini-1.5-flash';
    let url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    let data = await response.json();

    // Automatic fallback/debugging if the model name is incorrect
    if (!response.ok && data.error && (data.error.message.includes('is not found') || data.error.message.includes('not supported'))) {
      console.log('Model alias failed, querying ListModels...');
      
      const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      const listData = await listResponse.json();
      
      if (listData.models && listData.models.length > 0) {
        // Find the first model that supports generateContent and contains 1.5-flash
        const validModel = listData.models.find(m => 
          m.name.includes('1.5-flash') && 
          m.supportedGenerationMethods.includes('generateContent')
        );
        
        if (validModel) {
          console.log(`Found valid fallback model: ${validModel.name}`);
          // e.g. validModel.name could be 'models/gemini-1.5-flash-001'
          modelName = validModel.name.replace('models/', '');
          url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
          
          // Retry the request with the correct exact model string
          response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          
          data = await response.json();
        } else {
             // Let's at least log what models we found so we know
             console.error('Available Models:', listData.models.map(m => m.name).join(', '));
             throw new Error("No 1.5-flash model found in ListModels that supports generateContent.");
        }
      }
    }

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
