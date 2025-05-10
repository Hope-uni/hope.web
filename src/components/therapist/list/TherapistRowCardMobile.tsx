import { Show } from '@/components/Show';
import { UnassignedTag, UserVerifiedTag } from '@/components/common';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import { SingleTutorTherapist } from '@/models/schema';
import styles from '@/styles/modules/therapist.module.scss';
import { Descriptions, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  therapist: SingleTutorTherapist;
  showActions?: boolean;
}

const TherapistRowCardMobile = ({ therapist, showActions }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.therapist_row_card_mobile}>
      <Flex vertical gap="10px">
        {!therapist.isVerified && <UserVerifiedTag isVerified={false} />}
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
                      therapist.childrenInCharge &&
                      therapist.childrenInCharge > 0
                    )
                  }
                >
                  {therapist.childrenInCharge}
                </Show.When>
                <Show.Else>
                  <UnassignedTag />
                </Show.Else>
              </Show>
            </Descriptions.Item>
          </Descriptions>
        </Flex>
      </Flex>
      {showActions && (
        <div>
          <TherapistActions
            therapist={therapist}
            classWrapper="popup_actions_primary_vertical"
          />
        </div>
      )}
    </div>
  );
};

export default TherapistRowCardMobile;
