'use client';

import React, { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE;
const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton key={star} onClick={() => onRatingChange(star)}>
          {star <= rating ? <StarIcon style={{ color: "#FFD700" }} /> : <StarBorderIcon />}
        </IconButton>
      ))}
    </div>
  );
};
const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const chatBodyRef = useRef(null);

  const toggleChatBox = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
  
    const userMessage = { role: "user", content: inputMessage };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
  
    try {
      const response = await fetch("/api/generate/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Full API Response:", data);
  
      if (data.reply) {
        const assistantMessage = { role: "assistant", content: data.reply };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Unexpected response format from API");
      }
    } catch (error) {
      console.error("Detailed error:", error);
      const errorMessage = { role: "assistant", content: "I'm sorry, but I encountered an error. Please try again later." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });

      if (response.ok) {
        setFeedbackSubmitted(true);
        setTimeout(() => {
          setShowFeedback(false);
          setFeedbackSubmitted(false);
        }, 3000);
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const chatBoxStyles = {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "340px",
    maxWidth: "calc(100% - 40px)",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    maxHeight: '500px',
  };

  const chatBoxHeaderStyles = {
    padding: "10px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#C06014",
    color: "#fff",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  };

  const chatBoxBodyStyles = {
    padding: "10px",
    flexGrow: 1,
    overflowY: "auto",
  };

  const chatBoxFooterStyles = {
    padding: "10px",
    borderTop: "1px solid #e0e0e0",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  };

  const inputStyles = {
    flexGrow: 1,
    minWidth: "150px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    padding: "8px",
  };

  const buttonStyles = {
    padding: "8px 12px",
    backgroundColor: "#C06014",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div>
      <IconButton
        onClick={toggleChatBox}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#C06014",
          color: "#fff",
          borderRadius: "50%",
          zIndex: 1000,
        }}
      >
        <ChatIcon />
      </IconButton>

      {isChatOpen && (
        <div className="chat-box" style={chatBoxStyles}>
          <div className="chat-box-header" style={chatBoxHeaderStyles}>
            <h3 style={{ margin: 0 }}>Customer Support</h3>
          </div>
          <div className="chat-box-body" ref={chatBodyRef} style={chatBoxBodyStyles}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  textAlign: message.role === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    backgroundColor: message.role === "user" ? "#C06014" : "#f0f0f0",
                    color: message.role === "user" ? "#fff" : "#000",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    display: "inline-block",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          {!showFeedback ? (
            <div className="chat-box-footer" style={chatBoxFooterStyles}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message"
                style={inputStyles}
              />
              <button onClick={sendMessage} style={buttonStyles}>
                Send
              </button>
              <button
                onClick={() => setShowFeedback(true)}
                style={{ ...buttonStyles, backgroundColor: "#C06014" }}
              >
                Feedback
              </button>
            </div>
          ) : (
            <div className="chat-box-footer" style={{ ...chatBoxFooterStyles, flexDirection: "column", alignItems: "center" }}>
              {!feedbackSubmitted ? (
                <>
                  <p style={{ margin: "0 0 10px 0", textAlign: "center" }}>Please rate your experience:</p>
                  <StarRating rating={rating} onRatingChange={setRating} />
                  <button
                    onClick={handleFeedbackSubmit}
                    style={{ ...buttonStyles, backgroundColor: "#4CAF50", marginTop: "10px" }}
                  >
                    Submit Feedback
                  </button>
                </>
              ) : (
                <p style={{ margin: 0, textAlign: "center" }}>Thank you for your feedback!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBox;

