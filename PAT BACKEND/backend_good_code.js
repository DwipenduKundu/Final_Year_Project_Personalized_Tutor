// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import axios from "axios";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/chat", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`;

//     const requestData = {
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: prompt }]  // ✅ Corrected request format
//         }
//       ]
//     };

//     const response = await axios.post(API_URL, requestData, {
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.data && response.data.candidates && response.data.candidates.length > 0) {
//       const aiResponse = response.data.candidates[0].content.parts[0].text;
//       return res.json({ response: aiResponse });
//     } else {
//       return res.status(500).json({ error: "Invalid response from Gemini API" });
//     }
//   } catch (error) {
//     console.error("Error:", error.response ? error.response.data : error.message);
//     return res.status(500).json({ error: error.response ? error.response.data : error.message });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));






