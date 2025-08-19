import express from "express";
import cors from "cors"; // 🔹 Import CORS

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // 🔹 Use CORS
app.use(express.json());

app.post("/submit", (req, res) => {
  const { name, address } = req.body;

  if (name) {
    console.log("Name received:", name);
  } else if (address) {
    console.log("Wallet address received:", address);
  } else {
    return res.status(400).json({ error: "Missing name or address" });
  }

  return res.status(200).json({ message: "Success" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
