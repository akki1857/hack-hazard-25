const express = require('express');
const env = require('dotenv')
const axios = require('axios')
const cors = require('cors')

env.config()
const app = express();
app.use(express.json())
app.use(cors({
  origin : "http://localhost:5173"
}))


const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log(userMessage)
  
    try {
      const response = await axios.post(GROQ_API_URL, {
        model: "llama3-8b-8192", // or "llama3-70b-8192"
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ]
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      });
  
      const reply = response.data.choices[0].message.content;
      res.json({ reply });
    } catch (error) {
      console.error("Groq API Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Something went wrong." });
    }
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🟢 Server running at http://localhost:${PORT}`);
});