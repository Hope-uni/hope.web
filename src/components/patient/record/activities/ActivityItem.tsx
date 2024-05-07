'use client';

import React from 'react';
import { Flex, Typography } from 'antd';
import styles from '@/styles/modules/patient.module.scss';
import { Activity } from '@/models/schema/Activity';
import { BsCheckCircle } from 'react-icons/bs';
import { useTranslations } from 'next-intl';

const { Text } = Typography;

interface Props {
  activity: Activity;
  showIcon?: boolean;
}

export default function ActivityItem({ activity, showIcon = true }: Props) {
  const t = useTranslations('_.Patient.detail');
  return (
    <Flex vertical className={styles.activity_list_item} gap={3}>
      <Flex align="center" gap={4}>
        <Text className={styles.activity_list_name}>
          {showIcon && <BsCheckCircle size={14} />} {activity.name}
        </Text>
        <Text className={styles.activity_list_phase}>
          - {t('phase', { phase: activity.teaPhase })}
        </Text>
      </Flex>

      <Text className={styles.activity_list_content}>
        {activity.description}
      </Text>
    </Flex>
  );
}
