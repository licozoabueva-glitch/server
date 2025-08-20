require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/verify', async (req, res) => {
  const { address, name } = req.body;
  const message = address
    ? `New Wallet Submission: ${address}`
    : `New Name Submission: ${name}`;
  
  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    };

    const tgRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (tgRes.ok) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Failed to send message to Telegram' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));