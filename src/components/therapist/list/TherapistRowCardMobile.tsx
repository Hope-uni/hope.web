import { Show } from '@/components/Show';
import { UnassignedTag } from '@/components/common';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import { ListTherapistResponse } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import { Descriptions, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  therapist: ListTherapistResponse;
}

const TherapistRowCardMobile = ({ therapist }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.patient_row_card_mobile}>
      <Flex vertical gap="10px">
        <Flex vertical>
          <span className={styles.text_fullname}>{therapist.fullName}</span>
        </Flex>
        <Flex vertical>
          <Descriptions className="ant-descriptions-secondary">
            <Descriptions.Item label={t('Therapist.index.columns.email_short')}>
              {therapist.email}
            </Descriptions.Item>
            <Descriptions.Item label={t('Therapist.index.columns.phone')}>
              {therapist.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item
              label={t('Tutor.index.columns.patientsInCharge')}
            >
              <Show>
                <Show.When
                  isTrue={
                    !!(
                      therapist.patientsInCharge &&
                      therapist.patientsInCharge > 0
                    )
                  }
                >
                  {therapist.patientsInCharge}
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
          <TherapistActions therapist={therapist} />
        </div>
      </div>
    </div>
  );
};

export default TherapistRowCardMobile;
