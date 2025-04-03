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
          <img src="chat.png" alt="Chat Icon" style={{ width: '40px', height: '40px', verticalAlign: 'middle', marginRight: '5px' }} />
        </li>
        <li
          className={activePage === "youtube" ? "active" : ""}
          onClick={() => setActivePage("youtube")}
          role="button"
        >
          <img src="youtube.jpg" alt="YouTube Icon" style={{ width: '40px', height: '40px', verticalAlign: 'middle', marginRight: '5px' }} />
        </li>
        <li
          className={activePage === "wikipedia" ? "active" : ""}
          onClick={() => setActivePage("wikipedia")}
          role="button"
        >
          <img src="wikipedia.png" alt="Wikipedia Icon" style={{ width: '40px', height: '40px', verticalAlign: 'middle', marginRight: '5px' }} />
        </li>
        <li
          className={activePage === "test" ? "active" : ""}
          onClick={() => setActivePage("test")}
          role="button"
        >
          <img src="test.png" alt="Test Icon" style={{ width: '40px', height: '40px', verticalAlign: 'middle', marginRight: '5px' }} />
        </li>
        <li
          className={activePage === "settings" ? "active" : ""}
          onClick={() => setActivePage("settings")}
          role="button"
        >
          <img src="setting.png" alt="Settings Icon" style={{ width: '60px', height: '60px', verticalAlign: 'middle', marginRight: '5px' }} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
