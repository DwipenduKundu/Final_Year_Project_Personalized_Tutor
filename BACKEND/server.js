import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("❌ Missing GOOGLE_API_KEY in .env file");
  process.exit(1);
}

// ✅ Use Gemini 2.0 Flash Model
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;

// ✅ Chat Route
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const requestData = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    const response = await axios.post(API_URL, requestData, {
      headers: { "Content-Type": "application/json" },
    });

    const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiResponse) return res.status(500).json({ error: "Invalid response from Gemini API" });

    return res.json({ response: aiResponse });
  } catch (error) {
    console.error("❌ Chat API Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Generate Questions Route (5-10 MCQs per topic)
app.post("/generate-questions", async (req, res) => {
  try {
    const { topics } = req.body;
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ error: "At least one topic is required" });
    }

    // ✅ Generate MCQs for each topic concurrently
    const questionPromises = topics.map(async (topic) => {
      const prompt = `
Generate a set of **exactly 5 to 10 multiple-choice questions** (MCQs) on the topic "${topic}".  
Ensure each question follows this **strict JSON format**:

[
  {
    "question": "What is AI?",
    "options": {
      "A": "Artificial Intelligence",
      "B": "Automated Input",
      "C": "Advanced Interaction",
      "D": "Analytical Insight"
    },
    "correct": "A"
  },
  ...
]

**Rules:**
- Each question must have exactly 4 options labeled "A", "B", "C", and "D".
- Provide only valid JSON. Do not include any explanations or extra text.
`;

      const requestData = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      };

      try {
        const response = await axios.post(API_URL, requestData, {
          headers: { "Content-Type": "application/json" },
        });

        const aiGeneratedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(`🔹 AI Response for "${topic}":`, aiGeneratedText);

        if (!aiGeneratedText) throw new Error(`Invalid AI response for "${topic}"`);

        // ✅ Extract and parse JSON safely
        const jsonMatch = aiGeneratedText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) throw new Error(`Invalid JSON format received for "${topic}"`);

        let questions;
        try {
          questions = JSON.parse(jsonMatch[0]);
          if (!Array.isArray(questions)) throw new Error("AI did not return an array.");
        } catch (parseError) {
          throw new Error(`Failed to parse JSON for "${topic}": ${parseError.message}`);
        }

        // ✅ Ensure AI returns between 5 and 10 questions
        if (questions.length < 5) {
          throw new Error(`AI returned only ${questions.length} questions, expected at least 5.`);
        }

        return { topic, questions: questions.slice(0, 10) };
      } catch (error) {
        console.error(`❌ Error generating questions for "${topic}":`, error.message);
        return { topic, error: error.message };
      }
    });

    const results = await Promise.all(questionPromises);
    const successfulTopics = results.filter((r) => !r.error);
    const failedTopics = results.filter((r) => r.error);

    if (successfulTopics.length === 0) {
      return res.status(500).json({ error: "Failed to generate questions for all topics." });
    }

    return res.json({ topics: successfulTopics, failedTopics });
  } catch (error) {
    console.error("❌ Server Error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
