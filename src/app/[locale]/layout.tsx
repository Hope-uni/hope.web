import type { Metadata } from 'next';
import { theme } from '@/theme/index';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/styles/main.scss';
import { ConfigProvider } from 'antd';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import MainLayout from '@/components/layouts/MainLayout';

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'HOPE-Admin',
  description: 'Web module for hope app',
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <ConfigProvider theme={theme}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AntdRegistry>{children}</AntdRegistry>
          </NextIntlClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
