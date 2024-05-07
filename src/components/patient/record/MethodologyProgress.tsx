'use client';

import styles from '@/styles/modules/patient.module.scss';
import { Flex, Progress, Typography } from 'antd';
import COLORS from '@/styles/modules/variablesExport.module.scss';
import { useTranslations } from 'next-intl';

interface Props {
  percent: number;
  phase: number;
  grade: number;
}

export default function MethodologyProgress({ percent, phase, grade }: Props) {
  const t = useTranslations('_.Patient.detail');
  return (
    <Flex vertical justify="center" align="center" gap={5}>
      <Flex>
        <Progress
          type="circle"
          percent={percent}
          strokeColor={COLORS.secondaryColor}
          size={67}
          strokeWidth={8}
          style={{
            fontWeight: 500,
          }}
        />
      </Flex>
      <Flex gap={8}>
        <Typography.Text className={styles.progress_text}>
          {t('grade', { grade })} | {t('phase', { phase })}
        </Typography.Text>
      </Flex>
    </Flex>
  );
}
