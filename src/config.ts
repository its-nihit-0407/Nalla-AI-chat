// export const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API;
// export const CLERK_PUB_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


export const GEMINI_API_KEY = "AIzaSyBgSti-py2TwjlcvohjQKXTiPEjNbLMs30";
export const CLERK_PUB_KEY = "pk_test_ZWFzeS1tYWtvLTUzLmNsZXJrLmFjY291bnRzLmRldiQ";

export const generationConfig = {
  temperature: 1.85,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Guest user details
export const GUEST_USER = {
  id: "guest",
  firstName: "Guest",
  username: "guest-user",
};