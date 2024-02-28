import type { Metadata } from "next";
import { poppins } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "HOPE-Admin",
  description: "Web module for hope app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
