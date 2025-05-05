
interface MessageProps {
  content: string;
  isUser: boolean;
  avatar?: string;
}

export const initialMessages: MessageProps[] = [
 
  {
    content: "Hello! I’m your AI assistant. Please upload a PDF document, and I’ll be happy to help you with any questions related to its content.",
    isUser: false,
  }
  

];