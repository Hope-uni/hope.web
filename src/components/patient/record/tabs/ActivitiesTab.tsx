'use client';

import ActivityList from '@/components/patient/record/activities/ActivityList';
import { Activity } from '@/models/schema/Activity';
import styles from '@/styles/modules/patient.module.scss';
import { Col, Flex, Row, Typography } from 'antd';

import ActivityItem from '@/components/patient/record/activities/ActivityItem';
import ActivityProgress from '@/components/patient/record/activities/ActivityProgress';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface Props {
  activities: Activity[];
}

export default function ActivityTab({ activities }: Props) {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={30}>
      <Flex vertical className={styles.current_activity} gap={15}>
        <Title className={styles.title_content_tab}>
          {t('Patient.detail.title_current_activity')}
        </Title>
        <Row gutter={[50, 50]}>
          <Col span={15}>
            <ActivityItem activity={activities[0]} showIcon={false} />
          </Col>
          <Col span={9}>
            <ActivityProgress
              percent={20}
              totalActivities={25}
              completedActivities={21}
            />
          </Col>
        </Row>
      </Flex>
      <ActivityList activities={activities} />
    </Flex>
  );
}
