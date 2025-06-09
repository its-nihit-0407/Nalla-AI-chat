import { UserButton } from '@clerk/clerk-react';
import { UserResource } from '@clerk/types';
import { Bot } from 'lucide-react';

interface ChatHeaderProps {
  user: UserResource | null | undefined;
}

export default function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <header className="bg-[#212121] shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-blue-600">Nalla AI chat Assistant</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">{user?.firstName || user?.username}</span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}