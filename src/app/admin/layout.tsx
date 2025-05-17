'use client';

import Loading from '@/app/admin/loading';
import MainLayout from '@/components/layouts/MainLayout';
import OverlayBlocking from '@/components/layouts/partials/OverlayBlocking';
import OverlaySession from '@/components/layouts/partials/OverlaySession';
import { useOverlayStore } from '@/lib/store';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Suspense } from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const { overlay, overlayBlocking, overlaySession } = useOverlayStore();

  if (overlayBlocking) {
    return <OverlayBlocking />;
  }

  if (overlaySession) {
    return <OverlaySession />;
  }

  return (
    <MainLayout>
      {overlay && (
        <Spin fullscreen indicator={<LoadingOutlined spin />} size="large" />
      )}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </MainLayout>
  );
}
