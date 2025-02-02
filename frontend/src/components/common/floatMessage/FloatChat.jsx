// src/components/FloatChat.js
import React, { useState } from "react";
import { BsChatText } from "react-icons/bs";
import ChatPage from "./ChatPage";

const FloatChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <div
        className="fixed bottom-5 right-5 bg-primary text-white p-4 rounded-full shadow-lg cursor-pointer"
        onClick={toggleChat}
      >
        <BsChatText size={24} />
      </div>
      {isChatOpen && <ChatPage />}
    </div>
  );
};

export default FloatChat;
