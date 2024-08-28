import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";

// Define the shape of your context's value
interface SocketContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}

interface Message {
  id: number;
  text: string;
}

// Create your context with the correct type
const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket: Socket = io("http://localhost:3000");

  const sendMessage = (text: string) => {
    const newMessage: Message = { id: Date.now(), text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("sendMessage", newMessage);
  };

  useEffect(() => {
    socket.on("receiveMessage", (message: Message) => {
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

// Custom hook to access your socket context within your child components
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
