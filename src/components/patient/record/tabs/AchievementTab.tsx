'use client';

import AchievementItem from '@/components/achievement/AchievementItem';
import { Achievement } from '@/models/schema/Achievement';
import styles from '@/styles/modules/patient.module.scss';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface Props {
  achievements: Achievement[];
}

export default function AchievementTab({ achievements }: Props) {
  const { t } = useTranslation();

  return (
    <Flex vertical className={styles.achievement_list} gap={30}>
      <Title className={styles.title_content_tab}>
        {t('Patient.detail.title_achieved_achievements')}
      </Title>
      <Flex
        className={styles.achievement_list_wrapper}
        gap={20}
        style={{
          flexWrap: 'wrap',
        }}
      >
        {achievements.map((item, index) => {
          return <AchievementItem achievement={item} key={index} />;
        })}
      </Flex>
    </Flex>
  );
}
