'use client';

import ActivityList from '@/components/patient/record/activities/ActivityList';
import {
  CurrentActivity,
  SingleActivity,
  SingleActivitySchema,
} from '@/models/schema/Activity';
import styles from '@/styles/modules/patient.module.scss';
import { Empty, Flex, Typography } from 'antd';

import ActivityItem from '@/components/patient/record/activities/ActivityItem';
import ActivityProgress from '@/components/patient/record/activities/ActivityProgress';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface Props {
  activities: SingleActivity[] | null;
  currentActivity: CurrentActivity | null;
}

export default function ActivityTab({ activities, currentActivity }: Props) {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={30}>
      <Flex vertical className={styles.current_activity} gap={15}>
        {!!currentActivity ? (
          <>
            <Title className={styles.title_content_tab}>
              {t('Patient.detail.title_current_activity')}
            </Title>
            <div className={styles.current_activity_container}>
              <div className={styles.current_activity_item_container}>
                <ActivityItem
                  activity={SingleActivitySchema.parse(currentActivity)}
                  showIcon={false}
                />
              </div>
              <ActivityProgress activity={currentActivity} />
            </div>
          </>
        ) : (
          <Empty
            description={t(
              'Patient.detail.feedback.current_activity_not_assigned',
            )}
            style={{ marginTop: 30 }}
          />
        )}
      </Flex>
      {activities && activities?.length > 0 && (
        <ActivityList activities={activities} />
      )}
    </Flex>
  );
}
