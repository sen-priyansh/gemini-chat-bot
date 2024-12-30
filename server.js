// Import required modules
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Import Gemini API (Ensure it's installed and configured correctly)
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message; // Extract the user's message from the request body
    try {
        const genAI = new GoogleGenerativeAI("YOUR API KEY"); // Replace with your API key
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userMessage);

        // Simulated AI response
        const responseMessage = `${result.response.text()}.`;

        // Send the response
        res.json({ reply: responseMessage });
    } catch (error) {
        console.error('Error interacting with Gemini API:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
