// ChatApp.jsx
import React, { useState } from "react";
import axios from "axios";

const ChatApp = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setChat([...chat, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setChat((prev) => [...prev, botMessage]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong." },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 text-center text-xl font-bold">
          Groq Chatbot 🤖
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 h-96">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex p-4 border-t border-gray-700">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 rounded-l-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
