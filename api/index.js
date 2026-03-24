const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Simple age check (for demo purposes)
app.post('/api/verify-age', (req, res) => {
  const { age } = req.body;
  if (age >= 18) {
    res.json({ allowed: true });
  } else {
    res.json({ allowed: false });
  }
});

// Image generation stub (replace with real API later)
app.post('/api/generate-image', (req, res) => {
  const { prompt } = req.body;
  res.json({
    imageUrl: "https://placehold.co/600x800/png?text=AI+Generated+Image"
  });
});

// Model chat stub (replace with real AI later)
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  res.json({
    reply: "Hey there, handsome! What would you like to talk about? 😘"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
