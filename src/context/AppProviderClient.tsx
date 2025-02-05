'use client';

import { I18nextProvider } from 'react-i18next';

import i18next from '@/i18n';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RQ_Conf } from '@/config/reactQuery';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: RQ_Conf.DEFAULT_STALE_TIME,
      gcTime: RQ_Conf.DEFAULT_CACHE_TIME,
      refetchOnWindowFocus: RQ_Conf.REFETCH_ON_WINDOW_FOCUS,
    },
  },
});

export function AppProviderClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </QueryClientProvider>
  );
}
