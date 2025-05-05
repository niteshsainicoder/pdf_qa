import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center border-t border-gray-200 p-4">
      <div className="relative flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim()}
        className={`ml-2 p-3 rounded-lg ${
          message.trim() 
            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        } transition-colors`}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;