'use client';

import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const ChatBox = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatBox = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Chat Icon */}
      <IconButton
        onClick={toggleChatBox}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "50%",
          zIndex: 1000,
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat Box */}
      {isChatOpen && (
        <div
          className="chat-box"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            backgroundColor: "#fff",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        >
          <div
            className="chat-box-header"
            style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}
          >
            <h3 style={{ margin: 0 }}>Customer Support</h3>
          </div>
          <div
            className="chat-box-body"
            style={{
              padding: "10px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {children}
          </div>
          <div
            className="chat-box-footer"
            style={{
              padding: "10px",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
            }}
          >
            <input
              type="text"
              placeholder="Type your message"
              style={{
                flexGrow: 1,
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                padding: "8px",
                marginRight: "8px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 12px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;