/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_GENERATIVE_AI_API: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }