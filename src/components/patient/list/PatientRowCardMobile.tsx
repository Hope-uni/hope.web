import { Show } from '@/components/Show';
import { UnassignedTag } from '@/components/common';
import PatientActions from '@/components/patient/list/PatientActions';
import { ListPatientResponse } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import { Descriptions, Flex, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  patient: ListPatientResponse;
}

const PatientRowCardMobile = ({ patient }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.patient_row_card_mobile}>
      <Flex vertical gap="10px">
        <Flex vertical>
          <span className={styles.text_fullname}>{patient.fullName}</span>
        </Flex>
        <Flex vertical>
          <Descriptions className="ant-descriptions-secondary">
            <Descriptions.Item label={t('Patient.index.columns.grade')}>
              <Show>
                <Show.When isTrue={!!patient.teaDegree.id}>
                  <Tag className="tag-degree">{patient.teaDegree.name}</Tag>
                </Show.When>
                <Show.Else>
                  <UnassignedTag />
                </Show.Else>
              </Show>
            </Descriptions.Item>
            <Descriptions.Item label={t('Patient.index.columns.phase')}>
              <Show>
                <Show.When isTrue={!!patient.currentPhase.id}>
                  {patient.currentPhase.name}
                </Show.When>
                <Show.Else>
                  <UnassignedTag />
                </Show.Else>
              </Show>
            </Descriptions.Item>
            <Descriptions.Item label={t('Patient.index.columns.age')}>
              {t('Patient.index.columns.years_old', {
                age: patient.age,
              })}
            </Descriptions.Item>
            <Descriptions.Item label={t('Patient.index.columns.achievements')}>
              {patient.achievementCount || 0}
            </Descriptions.Item>
          </Descriptions>
        </Flex>
      </Flex>
      <div>
        <PatientActions
          patient={patient}
          classWrapper="popup_actions_primary_vertical"
        />
      </div>
    </div>
  );
};

export default PatientRowCardMobile;
