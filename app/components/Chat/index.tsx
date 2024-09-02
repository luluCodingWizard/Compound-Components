"use client";
import React from "react";
import ChatWindow from "../ChatWindow";
import MessageInput from "../MessageInput";
import { SocketProvider } from "@/app/contexts/socketContext";

export interface Message {
  id: string;
  text: string;
}

// Define the type for the Chat component
interface ChatPropsI {
  children: React.ReactNode;
}

const Chat: React.FC<ChatPropsI> & {
  Window: typeof ChatWindow;
  Input: typeof MessageInput;
} = ({ children }) => {
  return (
    <div className="max-w-md mx-auto mt-10 border border-gray-300 rounded shadow-lg">
      <SocketProvider>{children}</SocketProvider>
    </div>
  );
};

// attach the child components as properties of Chat
Chat.Window = ChatWindow;
Chat.Input = MessageInput;
export default Chat;
