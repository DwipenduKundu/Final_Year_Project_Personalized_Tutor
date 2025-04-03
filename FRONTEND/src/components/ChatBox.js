import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown"; // ✅ Markdown support
import "../App.css";
import "./ChatBox.css";

const ChatBox = ({ setLatestQuery }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]); // ✅ Stores previous topics
  const messagesEndRef = useRef(null);

  // 🔹 Load messages & topics from localStorage on startup
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const savedTopics = JSON.parse(localStorage.getItem("chatTopics")) || [];

    setMessages(savedMessages);
    setHistory(savedTopics);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Extracts a meaningful topic from user message
  const extractTopic = (message) => {
    const words = message.split(" ");
    return words.find((word) => word.length > 3) || "General"; // Picks a relevant word
  };

  // 🔹 Handles sending message & AI response
  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const topic = extractTopic(input);
    const newMessage = { text: input, type: "user", topic: topic };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setLatestQuery(input);
    setInput("");

    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

    // ✅ Update chat history (topics)
    const updatedHistory = Array.from(new Set([topic, ...history]));
    setHistory(updatedHistory);
    localStorage.setItem("chatTopics", JSON.stringify(updatedHistory));

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = { text: data.response, type: "bot", topic: topic };
        const updatedMessagesWithBot = [...updatedMessages, botMessage];

        setMessages(updatedMessagesWithBot);
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessagesWithBot));
      } else {
        throw new Error(data.error || "AI response failed");
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { text: "⚠️ AI is not responding. Try again later.", type: "bot" };

      const updatedMessagesWithError = [...updatedMessages, errorMessage];
      setMessages(updatedMessagesWithError);
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessagesWithError));
    }
  };

  // 🔹 Clears chat messages and history
  const handleClearChat = () => {
    setMessages([]);
    setHistory([]);
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("chatTopics");
  };

  //Voice Input Handling
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser. Try Chrome.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => console.log("Voice recognition started...");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = (event) => console.error("Voice recognition error:", event.error);
    recognition.onend = () => console.log("Voice recognition ended.");

    recognition.start();
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-container ${msg.type}`}>
              {msg.type === "bot" && <img src="bot.png" alt="Settings Icon" style={{ width: '40px', height: '40px', verticalAlign: 'middle', marginRight: '5px' }} />}
              <div className={`message ${msg.type}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* here its for input box*/} 
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button onClick={handleSendMessage}>
            <img src="send.png" alt="Send Icon" style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
          </button>
          <button className="voice-btn" onClick={handleVoiceInput}>
            <img src="mic.png" alt="Mic Icon" style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
          </button>
          <button className="clear-btn" onClick={handleClearChat}>
            <img src="bin.png" alt="Bin Icon" style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
          </button>
        </div>
      </div>

      {/* 🔹 Displays extracted topics for easy access */}
      <div className="history-section">
        <h3>History</h3>
        <ul>
          {history.length > 0 ? (
            history.map((topic, index) => (
              <li key={index} onClick={() => setLatestQuery(topic)}>
                {topic}
              </li>
            ))
          ) : (
            <p>No topics yet. Start a chat to generate topics.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatBox;
