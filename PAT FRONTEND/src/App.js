import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ChatBox from "./components/ChatBox";
import YouTube from "./components/YouTube";
import Wikipedia from "./components/Wikipedia";
import Test from "./components/Test";
import Settings from "./components/Settings"; // ✅ Import the Settings component

const App = () => {
  const [activePage, setActivePage] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [latestQuery, setLatestQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  // 🔹 Load messages & topics from localStorage on app start
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const savedTopics = JSON.parse(localStorage.getItem("topics")) || [];

    setMessages(savedMessages);
    setTopics(savedTopics);
    setIsLoading(false);
  }, []);

  // 🔹 Save messages to localStorage when updated
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages, isLoading]);

  // 🔹 Save topics to localStorage when updated
  useEffect(() => {
    if (!isLoading && topics.length > 0) {
      localStorage.setItem("topics", JSON.stringify(topics));
    }
  }, [topics, isLoading]);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="content">
        {activePage === "chat" && (
          <ChatBox 
            messages={messages} 
            setMessages={setMessages} 
            setLatestQuery={setLatestQuery} 
          />
        )}
        {activePage === "youtube" && <YouTube latestQuery={latestQuery} />}
        {activePage === "wikipedia" && <Wikipedia latestQuery={latestQuery} />}
        {activePage === "test" && (
          <Test 
            messages={messages} 
            latestQuery={latestQuery} 
            topics={topics} 
            setTopics={setTopics}  
          />
        )}
        {activePage === "settings" && <Settings />} {/* ✅ Added Settings */}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 PAT | The Team</p>
      </footer>
    </div>
  );
};

export default App;
