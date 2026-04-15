const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Sends a structured prompt to Gemini regarding stadium routing and returns JSON-formatted advice.
 */
async function getGeminiRecommendation(query, userZone, crowdData, routeData) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.includes('your_gemini')) {
        console.log('[aiService] Using simulated fallback Gemini AI response.');
        return {
            answer: `Analysis complete. Based on your current position in the ${userZone} and real-time flow to the exit, I recommend this path.`,
            bestOption: routeData ? routeData.bestRoute : 'Main Exit',
            eta: routeData ? routeData.eta : '10 mins',
            reason: `This route avoids the main concourse congestion near the South Stand. You will save approximately time compared to standard routes.`
        };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-2.5-flash as the standard fast default for chat/text
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
            You are the "Smart Stadium AI", an intelligent crowd intelligence assistant for a massive cricket stadium.
            The user is currently in the ${userZone}. 
            Their specific query is: "${query}"
            
            Current live crowd constraints (percentages):
            ${JSON.stringify(crowdData)}
            
            Based on mathematical routing, optimal computed route info:
            ${JSON.stringify(routeData)}

            Please give a structured JSON answer to help the user navigate efficiently.
            The JSON must match this EXACT schema:
            {
              "answer": "A short, helpful conversational answer assessing their query",
              "bestOption": "The exact name of the destination or gate to take",
              "eta": "Estimated wait/travel time, e.g. '12 mins'",
              "reason": "Why you chose this route based on the crowd data provided"
            }
            Do not wrap the JSON in markdown blocks, return ONLY raw JSON.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Clean up potential markdown formatting that Gemini might sneak in
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);

    } catch (error) {
        console.error('[aiService] Gemini API Error:', error.message);
        throw new Error('Failed to generate AI recommendation.');
    }
}

module.exports = {
    getGeminiRecommendation
};
