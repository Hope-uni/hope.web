import 'i18next';
import es from '@/locales/es.ts';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: 'es';
    resources: {
      es: typeof es;
    };
  }
}
