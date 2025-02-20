'use client';

import { CurrentActivity } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import COLORS from '@/styles/modules/variablesExport.module.scss';
import { Flex, Progress, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { BsCheckCircle } from 'react-icons/bs';

const { Text } = Typography;

interface Props {
  activity: CurrentActivity;
}

export default function ActivityProgress({ activity }: Props) {
  const { t } = useTranslation();

  return (
    <Flex className={styles.activity_progress} vertical gap={5}>
      <Flex justify="space-between">
        <Text className={styles.activity_progress_text}>
          {t('Patient.detail.progress_with_percent', {
            value: activity.progress,
          })}
        </Text>
        <Flex align="center" gap={5}>
          <BsCheckCircle size={14} color={COLORS.success} />
          <Text className={styles.completed_activities}>
            {activity.satisfactoryAttempts}/{activity.satisfactoryPoints}
          </Text>
        </Flex>
      </Flex>
      <Progress
        percent={activity.progress}
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
