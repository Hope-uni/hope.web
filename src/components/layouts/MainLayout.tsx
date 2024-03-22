'use client';

import Sidebar from '@/components/layouts/partials/Sidebar';
import { Layout } from 'antd';
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
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
