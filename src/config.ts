export const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API;
export const CLERK_PUB_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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