import { UserButton } from '@clerk/clerk-react';
import { Bot, User } from 'lucide-react';

interface ChatHeaderProps {
  user: any; // Combined type for Clerk user and guest user
  isGuest?: boolean;
}

export default function ChatHeader({ user, isGuest }: ChatHeaderProps) {
  return (
    <header className="bg-[#212121] shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-blue-600">Nalla AI chat Assistant</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">{user?.firstName || user?.username}</span>
          {isGuest ? (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </header>
  );
}