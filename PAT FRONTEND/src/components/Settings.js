import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("fontSize") || "medium";
  });

  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("notifications") === "enabled";
  });

  // Dark Mode Handling
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  // Font Size Handling
  useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  // Notification Handling
  useEffect(() => {
    localStorage.setItem("notifications", notifications ? "enabled" : "disabled");
  }, [notifications]);

  return (
    <div className="settings-container">
      <h2>⚙️ Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="setting-item">
        <span>Dark Mode</span>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label htmlFor="darkModeToggle" className="toggle-slider"></label>
        </div>
      </div>

      {/* Font Size Selector */}
      <div className="setting-item">
        <span>Font Size</span>
        <select
          className="select-dropdown"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Notifications Toggle */}
      <div className="setting-item">
        <span>Enable Notifications</span>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="notificationsToggle"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <label htmlFor="notificationsToggle" className="toggle-sliderr"></label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
