import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

// create your context to handle state management and sockets
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:3000");

  const sendMessage = (text) => {
    const newMessage = { id: Date.now(), text };
    setMessages([...messages, newMessage]);
    socket.emit("sendMessage", newMessage);
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

// custom hook to access your socket context within your child components
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("SocketContext must be used within the Chat Component");
  }
  return context;
};
