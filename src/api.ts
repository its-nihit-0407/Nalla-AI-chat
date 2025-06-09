import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY, generationConfig } from "./config";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

export async function getAIResponse(inpt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(inpt);
  return result.response.text();
}