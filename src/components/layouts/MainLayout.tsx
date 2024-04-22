'use client';

import Sidebar from '@/components/layouts/partials/Sidebar';
import { Flex, Layout } from 'antd';
import React, { useMemo } from 'react';
import TopBar from '@/components/layouts/partials/TopBar';
import styles from '@/styles/modules/layouts.module.scss';
import { usePathname } from 'next/navigation';

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const isSingleContentInner = useMemo(() => {
    const regexPatientDetail = /patients\/\w+/;
    return regexPatientDetail.test(pathname);
  }, [pathname]);

  return (
    <Layout hasSider>
      <Sidebar />
      <Layout className={styles.wrapper_main_layout_content}>
        <TopBar />
        <Content
          className={styles.wrapper_main_layout_content_inner}
          style={{
            backgroundColor: !isSingleContentInner ? 'white' : 'transparent',
            boxShadow: !isSingleContentInner
              ? '1px 2px 6px 2px rgba(60, 60, 60, 0.10)'
              : 'none',
          }}
        >
          <Flex
            vertical
            className={styles.wrapper_main_layout}
            style={{
              padding: !isSingleContentInner ? '20px' : '0',
            }}
          >
            {children}
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}
