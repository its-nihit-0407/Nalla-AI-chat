export interface Message {
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
}