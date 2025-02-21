import ActionsActions from '@/components/activity/list/ActivityActions';
import { SingleActivity } from '@/models/schema';
import styles from '@/styles/modules/activity.module.scss';
import { Descriptions, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  activity: SingleActivity;
}

const ActivityRowCardMobile = ({ activity }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.activity_row_card_mobile}>
      <Flex vertical gap="10px">
        <Flex vertical gap={3}>
          <span className={styles.text_name}>{activity.name}</span>
          <p className={styles.text_description}>{activity.description}</p>
        </Flex>
        <Flex vertical>
          <Descriptions className="ant-descriptions-secondary">
            <Descriptions.Item label={t('Activity.index.columns.assignments')}>
              {activity.assignments?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label={t('Activity.index.columns.points')}>
              {activity.satisfactoryPoints}
            </Descriptions.Item>
            <Descriptions.Item label={t('Activity.index.columns.phase')}>
              {activity.phase.name}
            </Descriptions.Item>
          </Descriptions>
        </Flex>
      </Flex>
      <div>
        <ActionsActions
          activity={activity}
          classWrapper="popup_actions_primary_vertical"
        />
      </div>
    </div>
  );
};

export default ActivityRowCardMobile;
