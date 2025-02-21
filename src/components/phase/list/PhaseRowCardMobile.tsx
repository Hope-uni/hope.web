import { TEAPhase } from '@/models/schema';
import styles from '@/styles/modules/pecs.module.scss';
import { Descriptions, Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import PhaseActions from '@/components/phase/list/PhaseActions';

interface Props {
  phase: TEAPhase;
}

const PhaseRowCardMobile = ({ phase }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.phase_row_card_mobile}>
      <Flex vertical gap="10px">
        <Flex vertical gap={3}>
          <span className={styles.text_name}>{phase.name}</span>
          <p className={styles.text_description}>{phase.description}</p>
        </Flex>
        <Flex vertical>
          <Descriptions className="ant-descriptions-secondary">
            <Descriptions.Item label={t('Phase.index.columns.scoreActivities')}>
              {phase.scoreActivities}
            </Descriptions.Item>
          </Descriptions>
        </Flex>
      </Flex>
      <div>
        <PhaseActions
          phase={phase}
          classWrapper="popup_actions_primary_vertical"
        />
      </div>
    </div>
  );
};

export default PhaseRowCardMobile;
