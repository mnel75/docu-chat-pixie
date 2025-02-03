import { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatPanelProps {
  onHighlightText?: (text: string) => void;
}

const ChatPanel = ({ onHighlightText }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you with this document?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    // Send the text to be highlighted in the PDF
    if (onHighlightText) {
      onHighlightText(content);
    }
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm analyzing the document and will help you with your query.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPanel;