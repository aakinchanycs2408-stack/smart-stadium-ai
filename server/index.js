require('dotenv').config();

// Strict Key Validation
if (!process.env.ORS_API_KEY || process.env.ORS_API_KEY.includes('your_open')) {
    console.warn('\x1b[33m%s\x1b[0m', 'WARNING: ORS_API_KEY is missing or invalid in .env!');
}
if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('your_gemini')) {
    console.warn('\x1b[33m%s\x1b[0m', 'WARNING: GEMINI_API_KEY is missing or invalid in .env!');
}

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
    console.log(`Smart Stadium Backend listening on port ${PORT}`);
});
