import type { Metadata } from 'next';
import { theme } from '@/theme/index';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/styles/main.scss';
import { App, ConfigProvider } from 'antd';
import { getServerSession } from 'next-auth';
import SessionProviderClient from '@/context/Auth/SessionProviderClient';
import { AppProviderClient } from '@/context/AppProviderClient';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'HOPE-Admin',
  description: 'Web module for hope app',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const session = await getServerSession();

  return (
    <html lang={locale}>
      <body>
        <SessionProviderClient session={session}>
          <AppProviderClient>
            <ConfigProvider theme={theme}>
              <App>
                <AntdRegistry>{children}</AntdRegistry>
              </App>
            </ConfigProvider>
          </AppProviderClient>
        </SessionProviderClient>
      </body>
    </html>
  );
}
