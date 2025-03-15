'use client';

interface RootLayoutProps {
  children: React.ReactNode;
  detail: React.ReactNode;
}

export default function ActivityLayout({ children, detail }: RootLayoutProps) {
  return (
    <>
      {children}
      {detail}
    </>
  );
}
