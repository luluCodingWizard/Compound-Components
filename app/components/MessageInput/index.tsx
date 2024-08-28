import React, { useState } from "react";
import { useSocket } from "@/app/contexts/socketContext";

const MessageInput = () => {
  const { sendMessage } = useSocket();
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="p-4 flex">
      <input
        type="text"
        className="flex-1 p-2 border border-gray-300 rounded"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
