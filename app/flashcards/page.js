import React from "react";

export default function ChatBox({children}) { // Chatbox for flashcards
  return (
    <main>
      <div className="chat-box">
        <div className="chat-box-header">
          <h1>ThinkThrive</h1>
        </div>
        <div className="chat-box-body">
            {children}
        </div>
        <div className="chat-box-footer">
          <input type="text" placeholder="Enter Topic" />
          <button type="submit">Send</button>
        </div>
      </div>
    </main>
  );
}