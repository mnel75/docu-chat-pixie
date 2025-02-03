import { MessageSquare } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto messages-container space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 message-appear ${
            message.sender === "user" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === "user"
                ? "bg-primary text-white"
                : "bg-secondary text-primary"
            }`}
          >
            <MessageSquare size={16} />
          </div>
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.sender === "user"
                ? "bg-primary text-white"
                : "bg-secondary text-foreground"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;