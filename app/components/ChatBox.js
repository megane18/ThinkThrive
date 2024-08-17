// 'use client';

// import React, { useState } from "react";
// import { IconButton } from "@mui/material";
// import ChatIcon from "@mui/icons-material/Chat";

// const ChatBox = ({ children }) => {
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const toggleChatBox = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   return (
//     <div>
//       {/* Chat Icon */}
//       <IconButton
//         onClick={toggleChatBox}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           backgroundColor: "#C06014",
//           color: "#fff",
//           borderRadius: "50%",
//           zIndex: 1000,
//         }}
//       >
//         <ChatIcon />
//       </IconButton>

//       {/* Chat Box */}
//       {isChatOpen && (
//         <div
//           className="chat-box"
//           style={{
//             position: "fixed",
//             bottom: "80px",
//             right: "20px",
//             width: "300px",
//             backgroundColor: "#fff",
//             boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
//             borderRadius: "8px",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             className="chat-box-header"
//             style={{ 
//               padding: "10px", 
//               borderBottom: "1px solid #e0e0e0", 
//               backgroundColor: "#C06014", 
//               color: "#fff", 
//               borderTopLeftRadius: "8px", 
//               borderTopRightRadius: "8px" 
//             }}
//           >
//             <h3 style={{ margin: 0 }}>Customer Support</h3>
//           </div>
//           <div
//             className="chat-box-body"
//             style={{
//               padding: "10px",
//               maxHeight: "200px",
//               overflowY: "auto",
//             }}
//           >
//             {children}
//           </div>
//           <div
//             className="chat-box-footer"
//             style={{
//               padding: "10px",
//               borderTop: "1px solid #e0e0e0",
//               display: "flex",
//             }}
//           >
//             <input
//               type="text"
//               placeholder="Type your message"
//               style={{
//                 flexGrow: 1,
//                 border: "1px solid #e0e0e0",
//                 borderRadius: "4px",
//                 padding: "8px",
//                 marginRight: "8px",
//               }}
//             />
//             <button
//               type="submit"
//               style={{
//                 padding: "8px 12px",
//                 backgroundColor: "#C06014",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBox;











'use client';

import React, { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;



const ChatBox = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
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
            style={{
              padding: "10px",
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#C06014",
              color: "#fff",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px"
            }}
          >
            <h3 style={{ margin: 0 }}>Customer Support</h3>
          </div>
          <div
            className="chat-box-body"
            ref={chatBodyRef}
            style={{
              padding: "10px",
              height: "300px",
              overflowY: "auto",
            }}
          >
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
                  }}
                >
                  {message.content}
                </span>
              </div>
            ))}
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
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
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
              onClick={sendMessage}
              style={{
                padding: "8px 12px",
                backgroundColor: "#C06014",
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





// 'use client';

// import React, { useState } from "react";
// import { IconButton } from "@mui/material";
// import ChatIcon from "@mui/icons-material/Chat";

// const ChatBox = ({ children }) => {
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const toggleChatBox = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   return (
//     <div>
//       {/* Chat Icon */}
//       <IconButton
//         onClick={toggleChatBox}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           backgroundColor: "#000",
//           color: "#fff",
//           borderRadius: "50%",
//           zIndex: 1000,
//         }}
//       >
//         <ChatIcon />
//       </IconButton>

//       {/* Chat Box */}
//       {isChatOpen && (
//         <div
//           className="chat-box"
//           style={{
//             position: "fixed",
//             bottom: "80px",
//             right: "20px",
//             width: "300px",
//             backgroundColor: "#fff",
//             boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
//             borderRadius: "8px",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             className="chat-box-header"
//             style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}
//           >
//             <h3 style={{ margin: 0 }}>Customer Support</h3>
//           </div>
//           <div
//             className="chat-box-body"
//             style={{
//               padding: "10px",
//               maxHeight: "200px",
//               overflowY: "auto",
//             }}
//           >
//             {children}
//           </div>
//           <div
//             className="chat-box-footer"
//             style={{
//               padding: "10px",
//               borderTop: "1px solid #e0e0e0",
//               display: "flex",
//             }}
//           >
//             <input
//               type="text"
//               placeholder="Type your message"
//               style={{
//                 flexGrow: 1,
//                 border: "1px solid #e0e0e0",
//                 borderRadius: "4px",
//                 padding: "8px",
//                 marginRight: "8px",
//               }}
//             />
//             <button
//               type="submit"
//               style={{
//                 padding: "8px 12px",
//                 backgroundColor: "#000",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBox;