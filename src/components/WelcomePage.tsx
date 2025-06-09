import { useSignIn, useClerk } from '@clerk/clerk-react';
import { Bot } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface WelcomePageProps {
  setIsGuest: (value: boolean) => void;
}

export default function WelcomePage({ setIsGuest }: WelcomePageProps) {
  const { openSignIn } = useSignIn();
  const clerk = useClerk();

  const handleSignIn = () => {
    toast.promise(
      clerk.openSignIn({}),
      {
        loading: 'Redirecting to sign in...',
        success: 'Successfully signed in!',
        error: 'Failed to sign in',
      }
    );
  };

  const handleGuestSignIn = () => {
    toast.promise(
      new Promise((resolve) => {
        setIsGuest(true);
        resolve(true);
      }),
      {
        loading: 'Creating guest session...',
        success: 'Guest session created!',
        error: 'Failed to create guest session',
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="max-w-md w-full bg-[#0f0f0f67] rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Bot className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Welcome to Nalla AI</h1>
        <p className="text-gray-300 mb-8">
          Sign in to start chatting with our AI assistant. Your conversations will be saved and personalized just for you.
        </p>
        <div className="space-y-3">
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Sign In to Continue
          </button>
          <button
            onClick={handleGuestSignIn}
            className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}