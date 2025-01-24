'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { Suspense } from 'react';
import Loading from './loading';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useOverlayStore } from '@/lib/store';
import OverlayBlocking from '@/components/layouts/partials/OverlayBlocking';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const { overlay, overlayBlocking } = useOverlayStore();
  return (
    <>
      {overlayBlocking ? (
        <OverlayBlocking />
      ) : (
        <MainLayout>
          {overlay && (
            <Spin
              fullscreen
              indicator={<LoadingOutlined spin />}
              size="large"
            />
          )}
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </MainLayout>
      )}
    </>
  );
}
