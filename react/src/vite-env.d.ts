/// <reference types="vite/client" />

export interface ImportMetaEnv {
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;

  DODO_API_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
