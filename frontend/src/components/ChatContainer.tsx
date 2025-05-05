import React, { useEffect, useRef } from 'react';
import Message  from './Message';

interface MessageProps {
  content: string;
  isUser: boolean;
  avatar?: string;
}


interface ChatContainerProps {
  messages: MessageProps[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;