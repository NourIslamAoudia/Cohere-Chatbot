const express = require('express');
const cors = require('cors');
const { CohereClient } = require('cohere-ai');
require('dotenv').config();

const app = express();
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await cohere.chat({
      message: message,
      model: 'command-r-08-2024'
    });

    res.json({ 
      reply: response.text 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});