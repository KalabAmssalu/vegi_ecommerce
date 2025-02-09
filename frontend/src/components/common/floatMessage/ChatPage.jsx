import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../../api/axiosInstance";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: input }]);

    try {
      const res = await axiosInstance.post("/chats", { message: input });
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: res.data.answer, keywords: res.data.keywords },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Error connecting to the server" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Customer Support Chat
      </h2>

      <div className="flex flex-col h-60 overflow-y-scroll mb-4 p-4 border rounded-lg bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg max-w-xs ${
                msg.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
              {msg.keywords && (
                <div className="text-xs text-gray-500 mt-1">
                  Detected keywords: {msg.keywords.join(", ")}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="p-2 bg-primary text-white rounded-r-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
