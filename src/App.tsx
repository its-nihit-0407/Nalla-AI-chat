import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { CLERK_PUB_KEY } from './config';
import ChatApp from './components/ChatApp';
import WelcomePage from './components/WelcomePage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
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
    {/* // Add vercel analytics here */}
     <Analytics/>
    </>
  );
}

export default App;