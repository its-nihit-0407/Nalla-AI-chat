import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';
import { Message } from '../types';
import { getAIResponse } from '../api';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { GUEST_USER } from '../config';

interface ChatAppProps {
  guestUser?: typeof GUEST_USER;
}

export default function ChatApp({ guestUser }: ChatAppProps) {
  const { user: clerkUser } = useUser();
  const user = guestUser || clerkUser;
  const [messages, setMessages] = useState<Message[]>([
    {
      content: guestUser 
        ? "Hello Guest! I'm your AI assistant. Note: Your chat history won't be saved."
        : "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(input);
      const aiMessage: Message = {
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        content: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col">
      <Toaster position="top-center" />
      <ChatHeader user={user} isGuest={!!guestUser} />
      
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        {guestUser && (
          <div className="bg-yellow-600/20 text-yellow-200 text-sm p-2 rounded mb-4 text-center">
            You're using a guest account. Your chat history won't be saved.
          </div>
        )}
        
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
          messagesEndRef={messagesEndRef} 
        />
        
        <ChatInput 
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </div>

      <ScrollbarStyles />
    </div>
  );
}

const ScrollbarStyles = () => (
  <style>{`
    .scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .scrollbar::-webkit-scrollbar-track {
      background: #0f0f0f67;
      border-radius: 4px;
    }
    .scrollbar::-webkit-scrollbar-thumb {
      background: #3b82f6;
      border-radius: 4px;
    }
    .scrollbar::-webkit-scrollbar-thumb:hover {
      background: #2563eb;
    }
  `}</style>
);