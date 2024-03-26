import MainLayout from '@/components/layouts/MainLayout';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return <MainLayout>{children}</MainLayout>;
}
