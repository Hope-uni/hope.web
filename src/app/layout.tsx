import type { Metadata } from "next";
import { theme } from "@/theme/index";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/styles/main.scss";
import { ConfigProvider } from "antd";

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
      <body>
        <ConfigProvider theme={theme}>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
