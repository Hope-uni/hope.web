import { Show } from '@/components/Show';
import { UnassignedTag } from '@/components/common';
import TutorActions from '@/components/tutor/list/TutorActions';
import { SingleTutorTherapist } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import { Descriptions, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  tutor: SingleTutorTherapist;
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
                    !!(tutor.childrenInCharge && tutor.childrenInCharge > 0)
                  }
                >
                  {tutor.childrenInCharge}
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
        <TutorActions
          tutor={tutor}
          classWrapper="popup_actions_primary_vertical"
        />
      </div>
    </div>
  );
};

export default TutorRowCardMobile;
