"use client";
import React from "react";
import ChatWindow from "../ChatWindow";
import MessageInput from "../MessageInput";
import { SocketProvider } from "@/app/contexts/socketContext";

export interface Message {
  id: string;
  text: string;
}

function Chat() {
  return (
    <div className="max-w-md mx-auto mt-10 border border-gray-300 rounded shadow-lg">
      <SocketProvider>
        <ChatWindow />
        <MessageInput />
      </SocketProvider>
    </div>
  );
}

export default Chat;
