const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Initialize OpenAI client for NVIDIA API
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Enable CORS to allow requests from the Angular frontend
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Parse JSON request bodies
app.use(express.json());

// Define the chat completion endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-nemotron-70b-instruct",
      messages: [{ role: "user", content: message }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: true
    });

    let responseText = '';

    // Collect the streamed response
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || '';
      responseText += content;
    }

    res.json({ response: responseText });
  } catch (error) {
    console.error('Error communicating with NVIDIA API:', error.message);
    res.status(500).json({ error: 'Error communicating with NVIDIA API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
