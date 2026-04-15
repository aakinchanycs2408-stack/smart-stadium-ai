const axios = require('axios');

/**
 * Calculates the walking distance between a starting and destination coordinate
 * using OpenRouteService Directions API.
 * Expects coordinates as an object: { lat: Float, lng: Float }
 */
async function getWalkingDistance(fromCoords, toCoords) {
    const apiKey = process.env.ORS_API_KEY;

    // Simulate distance fallback if key is missing or dummy
    if (!apiKey || apiKey.includes('your_open')) {
        console.log('[mapsService] Using simulated fallback ORS distance math.');
        
        // Approximate mock logic using Pythagoras (not accurate, just for mock tests)
        const dLat = (toCoords.lat - fromCoords.lat) * 111000; // rough meters per degree
        const dLng = (toCoords.lng - fromCoords.lng) * 111000;
        const distMeters = Math.floor(Math.sqrt(dLat*dLat + dLng*dLng)) || 300;
        const seconds = Math.floor(distMeters / 1.4);
        
        return {
            distance: (distMeters / 1000).toFixed(2), // km
            eta: Math.ceil(seconds / 60) // minutes
        };
    }

    try {
        console.log(`[mapsService] Calling ORS from [${fromCoords.lng}, ${fromCoords.lat}] to [${toCoords.lng}, ${toCoords.lat}]`);
        
        // OpenRouteService expects coordinates as [longitude, latitude] arrays
        const response = await axios.post(
            'https://api.openrouteservice.org/v2/directions/foot-walking/json',
            {
                coordinates: [
                    [fromCoords.lng, fromCoords.lat],
                    [toCoords.lng, toCoords.lat]
                ]
            },
            {
                headers: {
                    'Authorization': apiKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const summary = response.data.routes[0].summary;
            return {
                distance: parseFloat((summary.distance / 1000).toFixed(2)), // in km
                eta: Math.ceil(summary.duration / 60) // in minutes
            };
        } else {
            throw new Error(`ORS API returned unexpected format.`);
        }
    } catch (error) {
        console.error('[mapsService] OpenRouteService API Error:', error.message);
        if (error.response && error.response.data) {
            console.error('[mapsService] Response Details:', JSON.stringify(error.response.data));
        }
        throw new Error('Failed to fetch route from OpenRouteService');
    }
}

module.exports = {
    getWalkingDistance
};
