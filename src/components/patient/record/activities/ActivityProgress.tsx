'use client';

import { Flex, Progress, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import styles from '@/styles/modules/patient.module.scss';
import COLORS from '@/styles/modules/variablesExport.module.scss';
import { BsCheckCircle } from 'react-icons/bs';

const { Text } = Typography;

interface Props {
  percent: number;
  totalActivities: number;
  completedActivities: number;
}

export default function ActivityProgress({
  percent,
  totalActivities,
  completedActivities,
}: Props) {
  const t = useTranslations('_.Patient.detail');

  return (
    <Flex className={styles.activity_progress} vertical gap={5}>
      <Flex justify="space-between">
        <Text className={styles.activity_progress_text}>
          {t('progress')} {percent}%
        </Text>
        <Flex align="center" gap={5}>
          <BsCheckCircle size={14} color={COLORS.success} />
          <Text className={styles.completed_activities}>
            {completedActivities}/{totalActivities}
          </Text>
        </Flex>
      </Flex>
      <Progress
        percent={percent}
        showInfo={false}
        strokeColor={COLORS.success}
        strokeWidth={8}
        style={{
          fontWeight: 500,
        }}
      />
    </Flex>
  );
}
