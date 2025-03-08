import React from "react";
import "./Navbar.css";

const Navbar = ({ activePage, setActivePage }) => {
  return (
    <nav className="navbar">
      <ul>
        <li
          className={activePage === "chat" ? "active" : ""}
          onClick={() => setActivePage("chat")}
          role="button"
        >
          💬 Chat
        </li>
        <li
          className={activePage === "youtube" ? "active" : ""}
          onClick={() => setActivePage("youtube")}
          role="button"
        >
          📺 YouTube
        </li>
        <li
          className={activePage === "wikipedia" ? "active" : ""}
          onClick={() => setActivePage("wikipedia")}
          role="button"
        >
          📖 Wikipedia
        </li>
        <li
          className={activePage === "test" ? "active" : ""}
          onClick={() => setActivePage("test")}
          role="button"
        >
          📝 Test
        </li>
        <li
          className={activePage === "settings" ? "active" : ""}
          onClick={() => setActivePage("settings")}
          role="button"
        >
          ⚙️ Settings
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
