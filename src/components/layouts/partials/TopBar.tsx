'use client';

import { Flex, Layout, Typography } from 'antd';
import React from 'react';
import styles from '@/styles/modules/layouts.module.scss';
import AvatarProfile from '@/components/Avatar';
import { format } from 'date-fns';

const { Header } = Layout;
const { Title, Paragraph } = Typography;

export default function TopLayout() {
  const currentDate = new Date();
  const formattedMonth = format(currentDate, 'MMMM');
  const formattedDay = format(currentDate, 'dd');
  const formattedYear = format(currentDate, 'yyyy');
  return (
    <Header className={styles.topbar}>
      <Flex justify="space-between">
        <Flex vertical>
          <Paragraph className={styles.topbar_date_month_day}>
            <strong>{formattedMonth}</strong> {formattedDay}
          </Paragraph>
          <Title level={5} className={styles.topbar_date_year}>
            {formattedYear}
          </Title>
        </Flex>
        <AvatarProfile />
      </Flex>
    </Header>
  );
}
