import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Load variables gikan sa .env file

const app = express();
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/submit", async (req, res) => {
  const { address, name } = req.body;

  let message = "";
  if (address) {
    message = `📝 New Wallet Submitted:\n${address}`;
  } else if (name) {
    message = `👤 New Name Submitted:\n${name}`;
  } else {
    return res.status(400).json({ error: "No data provided" });
  }

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
    });

    res.json({ success: true, sent: message });
  } catch (err) {
    console.error("Telegram error:", err);
    res.status(500).json({ error: "Failed to send to Telegram" });
  }
});

app.listen(4000, "0.0.0.0", () => {
  console.log("✅ Server running on port 4000");
});
