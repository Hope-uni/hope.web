'use client';

import Sidebar from '@/components/layouts/partials/Sidebar';
import { Flex, Layout } from 'antd';
import React from 'react';
import TopBar from '@/components/layouts/partials/TopBar';
import styles from '@/styles/modules/layouts.module.scss';

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <Layout hasSider>
      <Sidebar />
      <Layout className={styles.wrapper_main_layout_content}>
        <TopBar />
        <Content className={styles.wrapper_main_layout_content_inner}>
          <Flex vertical className={styles.wrapper_main_layout}>
            {children}
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}
