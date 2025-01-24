import type { Metadata } from 'next';
import { theme } from '@/theme/index';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/styles/main.scss';
import { ConfigProvider } from 'antd';
import { TableProvider } from '@/context/Table/TableProvider';
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
              <AntdRegistry>
                <TableProvider>{children}</TableProvider>
              </AntdRegistry>
            </ConfigProvider>
          </AppProviderClient>
        </SessionProviderClient>
      </body>
    </html>
  );
}
