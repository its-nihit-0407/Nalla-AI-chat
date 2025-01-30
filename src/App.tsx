import React, { useState } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { GoogleGenerativeAI,HarmCategory,HarmBlockThreshold } from "@google/generative-ai";
// import 'dotenv/config';

// const key = process.env.GOOGLE_GENERATIVE_AI_API as string
const key = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API;

// if (!key) {
//   throw new Error("Missing API key in environment variables");
// }
// console.log("API Key:", key);

const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1.85,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(inpt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(inpt);
  let response = result.response.text();

  return response;
}

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

  const getAIResponse = async (userInput: string) => {
    // Simulate network delay for more natural feeling
    await new Promise(resolve => setTimeout(resolve, 500));

    const input = userInput.toLowerCase();
    
    // Simple pattern matching for responses
    if (input == ('hello') || input == ('hi')) {
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

    let data = run(userInput);
    // const prompt = userInput;
    // const result = await model.generateContent(prompt);
    
    // console.log(response)
    // Default response for unmatched patterns
    // return "I understand you're saying something about '" + 
    //        userInput.slice(0, 30) + 
    //        "'. Could you rephrase that or ask something specific?";

    return data;
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">Nalla AI chat Assistant</h1>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        <div className="flex-1 bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto min-h-[500px]">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Brain is thinking...</span>
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;