/**
 * Generates dynamic crowd simulation data and wait times based on a pseudo-random baseline
 * so that values rotate but don't wildly jump around too aggressively between calls.
 */

// Basic simulated baseline states for each stand
let simulatedState = {
    'North Stand': { crowdPercent: 30 },
    'South Stand': { crowdPercent: 85 },
    'East Stand': { crowdPercent: 60 },
    'West Stand': { crowdPercent: 20 }
};

// Map wait time based on crowd percentage
function calculateWaitTime(crowdPercent) {
    if (crowdPercent < 25) return '2 mins';
    if (crowdPercent < 50) return '5 mins';
    if (crowdPercent < 75) return '12 mins';
    if (crowdPercent < 90) return '20 mins';
    return '30+ mins';
}

function getCrowdData() {
    // Randomize slightly off the baseline state by +/- 5% to look "live"
    const result = {};
    for (const [stand, data] of Object.entries(simulatedState)) {
        // Drift between -5 and +5
        const drift = Math.floor(Math.random() * 11) - 5;
        let newPercent = data.crowdPercent + drift;
        // Clamp between 5% and 98%
        newPercent = Math.max(5, Math.min(98, newPercent));
        
        // Update state and write to result
        simulatedState[stand].crowdPercent = newPercent;
        
        result[stand] = {
            crowdPercent: newPercent,
            waitTime: calculateWaitTime(newPercent)
        };
    }
    
    return result;
}

module.exports = {
    getCrowdData,
    calculateWaitTime
};
