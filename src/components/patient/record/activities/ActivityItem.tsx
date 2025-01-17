'use client';

import { Activity } from '@/models/schema/Activity';
import styles from '@/styles/modules/patient.module.scss';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { BsCheckCircle } from 'react-icons/bs';

const { Text } = Typography;

interface Props {
  activity: Activity;
  showIcon?: boolean;
}

export default function ActivityItem({ activity, showIcon = true }: Props) {
  const { t } = useTranslation();
  return (
    <Flex vertical className={styles.activity_list_item} gap={3}>
      <Flex align="center" gap={4}>
        <Text className={styles.activity_list_name}>
          {showIcon && <BsCheckCircle size={14} />} {activity.name}
        </Text>
        <Text className={styles.activity_list_phase}>
          - {t('Patient.detail.phase', { phase: activity.teaPhase })}
        </Text>
      </Flex>

      <Text className={styles.activity_list_content}>
        {activity.description}
      </Text>
    </Flex>
  );
}
