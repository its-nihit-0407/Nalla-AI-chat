import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';

interface Message {
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userInput: string) => {
    // Simulate network delay for more natural feeling
    await new Promise(resolve => setTimeout(resolve, 500));

    const input = userInput.toLowerCase();
    
    // Simple pattern matching for responses
    if (input === 'hello' || input === 'hi') {
      return "Hello! It's great to hear from you. How can I assist you today?";
    }
    
    if (input.includes('how are you')) {
      return "I'm functioning well, thank you for asking! How can I help you?";
    }
    
    if (input.includes('weather')) {
      return "I'm sorry, I don't have access to real-time weather data. You might want to check a weather service for that information.";
    }
    
    if (input.includes('help') || input.includes('can you')) {
      return "I'm a simple AI assistant. I can engage in conversation and try to help answer your questions. What would you like to know?";
    }
    
    if (input.includes('thank')) {
      return "You're welcome! Let me know if there's anything else I can help with.";
    }
    
    if (input.includes('bye') || input.includes('goodbye')) {
      return "Goodbye! Have a great day! Feel free to come back if you need anything else.";
    }

    // Simulate a more intelligent response
    return "I understand you're asking about '" + 
           userInput.slice(0, 30) + 
           "'. This is a demo version, so I have limited capabilities. Could you try asking something else?";
  };

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(currentInput);
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
    <div className="h-screen bg-[#212121] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-[#212121] shadow-lg flex-shrink-0 border-b border-gray-700">
        <div className="max-w-full mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
          <h1 className="text-lg sm:text-xl font-semibold text-blue-600 truncate">
            Nalla AI Chat Assistant
          </h1>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col min-h-0 p-2 sm:p-4">
        {/* Messages Area */}
        <div className="flex-1 bg-[#0f0f0f67] rounded-lg shadow-lg overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 sm:gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0f0f0f67] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 break-words ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#0f0f0f67] text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400 px-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Brain is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="flex gap-2 mt-3 sm:mt-4 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="Type your message..."
            className="flex-1 bg-[#0f0f0f67] rounded-lg border border-blue-500 px-3 sm:px-4 py-2 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 text-white rounded-lg px-3 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;