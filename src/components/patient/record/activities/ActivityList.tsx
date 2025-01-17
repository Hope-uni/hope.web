'use client';

import ActivityItem from '@/components/patient/record/activities/ActivityItem';
import { Activity } from '@/models/schema/Activity';
import styles from '@/styles/modules/patient.module.scss';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

interface Props {
  activities: Activity[];
}

export default function ActivityList({ activities }: Props) {
  const { t } = useTranslation();
  return (
    <Flex vertical gap={15} className={styles.activity_list}>
      <Title className={styles.title_content_tab}>
        {t('Patient.detail.title_completed_activities')}
      </Title>
      <Flex vertical gap={10} className={styles.activity_list_wrapper}>
        {activities.map((item, index) => {
          return <ActivityItem activity={item} key={index} />;
        })}
      </Flex>
    </Flex>
  );
}
