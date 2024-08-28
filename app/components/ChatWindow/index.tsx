import React from "react";
import { useSocket } from "../../contexts/socketContext";
import { Message } from "../Chat";
const ChatWindow = () => {
  const { messages } = useSocket();
  return (
    <div className="p-4 h-80 overflow-y-auto bg-gray-100">
      {messages.map((message: Message) => (
        <div key={message.id} className="p-2 bg-blue-200 mb-2 rounded">
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
