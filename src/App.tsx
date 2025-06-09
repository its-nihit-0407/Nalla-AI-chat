import { useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { CLERK_PUB_KEY, GUEST_USER } from './config';
import ChatApp from './components/ChatApp';
import WelcomePage from './components/WelcomePage';

function App() {
  const [isGuest, setIsGuest] = useState(false);

  return (
    <ClerkProvider
      publishableKey={CLERK_PUB_KEY}
      appearance={{
        variables: {
          colorPrimary: '#3b82f6',
        },
      }}
    >
      {isGuest ? (
        <ChatApp guestUser={GUEST_USER} />
      ) : (
        <>
          <SignedIn>
            <ChatApp />
          </SignedIn>
          <SignedOut>
            <WelcomePage setIsGuest={setIsGuest} />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default App;