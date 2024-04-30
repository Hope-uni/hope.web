import MainLayout from '@/components/layouts/MainLayout';
import { NavigationEvents } from '@/components/navigation-events';
import { Suspense } from 'react';
import Loading from './loading';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </MainLayout>
  );
}
