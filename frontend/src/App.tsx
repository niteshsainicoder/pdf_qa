import  { useState } from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import { uploadPDF } from './utils/fileUpload';
import { initialMessages } from './data/initialMessages';

interface MessageProps {
  content: string;
  isUser: boolean;
  avatar?: string;
}

function App() {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
const [fileId, setFileId] = useState<string | null>(null);
 
const handleSendMessage = async (content: string) => {
  // Add user message
  const userMessage: MessageProps = {
    content,
    isUser: true,
  };

  const body = {
    question: content,
    filename: fileId,
  };

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to get an answer from the backend.');
  }

  setMessages((prev) => [...prev, userMessage]);

  const data = await response.json();
  console.log(data);

  const aiMessage: MessageProps = {
    content: data.answer, // ✅ fixed typo
    isUser: false,
  };

  console.log(aiMessage);

  setMessages((prev) => [...prev, aiMessage]);
};


  const handleUploadPDF = async () => {
    try {
      setIsUploading(true);
      const file = await uploadPDF();
      
      setFileName(file?.name)// Add a system message about the upload
      
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json()
     setFileId(data.filename);
console.log(data);

      const systemMessage: MessageProps = {
        content: `File "${file.name}" uploaded successfully. You can now ask questions about this document.`,
        isUser: false,
      };
      
      setMessages((prev) => [...prev, systemMessage]);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header onUploadPDF={handleUploadPDF} pdfName={fileName} />
      <ChatContainer messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;