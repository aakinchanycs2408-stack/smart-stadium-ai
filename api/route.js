export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { fromCoords, toCoords } = req.body;
    
    if (!fromCoords || !toCoords) {
      return res.status(400).json({ error: 'Missing coordinates' });
    }

    const payload = {
      coordinates: [
        [fromCoords.lng, fromCoords.lat],
        [toCoords.lng, toCoords.lat]
      ]
    };

    const response = await fetch('https://api.openrouteservice.org/v2/directions/foot-walking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.ORS_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch from ORS');
    }

    // Extract distance and format ETA
    const feature = data.features[0];
    const distanceMeters = feature.properties?.summary?.distance || 0;
    const durationSeconds = feature.properties?.summary?.duration || 0;

    const distanceKm = (distanceMeters / 1000).toFixed(2);
    const durationMins = Math.ceil(durationSeconds / 60);

    return res.status(200).json({
      distance: distanceKm,
      eta: `${durationMins} mins`
    });
  } catch (error) {
    console.error('Route API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
