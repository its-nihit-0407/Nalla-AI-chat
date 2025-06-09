import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { CLERK_PUB_KEY } from './config';
import ChatApp from './components/ChatApp';
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUB_KEY}
      appearance={{
        variables: {
          colorPrimary: '#3b82f6',
        },
      }}
    >
      <SignedIn>
        <ChatApp />
      </SignedIn>
      <SignedOut>
        <WelcomePage />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;