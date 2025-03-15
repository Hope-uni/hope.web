'use client';

import { I18nextProvider } from 'react-i18next';
import i18next from '@/i18n';
import { RQ_Conf } from '@/config/reactQuery';
import { NotificationProvider } from '@/context/Notification/NotificationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      <I18nextProvider i18n={i18next}>
        <NotificationProvider>{children}</NotificationProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
