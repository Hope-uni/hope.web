import { Show } from '@/components/Show';
import { UnassignedTag } from '@/components/common';
import PopupActions from '@/components/table/PopupActions';
import { ListTutorResponse } from '@/models/schema';
import { ActionType } from '@/models/types';
import styles from '@/styles/modules/patient.module.scss';
import { Descriptions, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

const actionsUser: ActionType[] = ['show', 'edit', 'delete'];

interface Props {
  tutor: ListTutorResponse;
}

const TutorRowCardMobile = ({ tutor }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.patient_row_card_mobile}>
      <Flex vertical gap="10px">
        <Flex vertical>
          <span className={styles.text_fullname}>{tutor.fullName}</span>
        </Flex>
        <Flex vertical>
          <Descriptions.Item label={t('Tutor.index.columns.phone')}>
            {tutor.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label={t('Tutor.index.columns.telephone')}>
            {tutor.telephone}
          </Descriptions.Item>
          <Descriptions className="ant-descriptions-secondary">
            <Descriptions.Item
              label={t('Tutor.index.columns.patientsInCharge')}
            >
              <Show>
                <Show.When
                  isTrue={
                    !!(tutor.patientsInCharge && tutor.patientsInCharge > 0)
                  }
                >
                  {tutor.patientsInCharge}
                </Show.When>
                <Show.Else>
                  <UnassignedTag />
                </Show.Else>
              </Show>
            </Descriptions.Item>
          </Descriptions>
        </Flex>
      </Flex>
      <div>
        <div className="table_popup_actions_mobile">
          <PopupActions id={tutor.id} actions={actionsUser} route="users" />
        </div>
      </div>
    </div>
  );
};

export default TutorRowCardMobile;
