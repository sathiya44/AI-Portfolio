/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_RESEND_API_KEY?: string;
  readonly RESEND_API_KEY?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly VITE_CLARITY_PROJECT_ID?: string;
  readonly NEXT_PUBLIC_CLARITY_PROJECT_ID?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
  clarity?: (...args: any[]) => void;
}
