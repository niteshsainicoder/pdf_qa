import React from 'react';

export interface MessageProps {
  content: string;
  isUser: boolean;
  avatar?: string;
}

const Message: React.FC<MessageProps> = ({ content, isUser, avatar }) => {
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-start' : 'justify-start'} mb-6 animate-fadeIn`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
        ${isUser ? 'bg-purple-200 text-purple-700' : 'bg-emerald-500 text-white'}`}>
        {isUser ? (
          <span className="font-medium text-sm">S</span>
        ) : (
          <span className="font-medium text-sm">ai</span>
        )}
      </div>
      
      <div className="max-w-[85%] md:max-w-[75%]">
        <div className={`px-4 py-3 rounded-lg ${isUser ? 'bg-gray-100' : 'bg-white'}`}>
          <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;