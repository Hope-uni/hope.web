'use client';

import AchievementItem from '@/components/achievement/AchievementItem';
import PatientActions from '@/components/patient/list/PatientActions';
import { CreatePatientResponse } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import { Empty, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  patient: CreatePatientResponse;
}

export default function AchievementTab({ patient }: Props) {
  const { t } = useTranslation();

  return (
    <Flex vertical className={styles.achievement_list} gap={30}>
      {patient.achievements && patient.achievements.length > 0 ? (
        <>
          <Flex justify="space-between" align="center">
            <Typography.Title className={styles.title_content_tab}>
              {t('Patient.detail.title_achieved_achievements')}
            </Typography.Title>
            <PatientActions patient={patient} renderMode="assign_achievement" />
          </Flex>
          <Flex
            className={styles.achievement_list_wrapper}
            gap={20}
            style={{
              flexWrap: 'wrap',
            }}
          >
            {patient.achievements.map((item, index) => {
              return <AchievementItem achievement={item} key={index} />;
            })}
          </Flex>
        </>
      ) : (
        <div className="col-center" style={{ gap: '20px' }}>
          <Empty
            description={t('Patient.detail.feedback.no_assigned_achievements')}
            style={{ marginTop: 30 }}
          />
          <PatientActions patient={patient} renderMode="assign_achievement" />
        </div>
      )}
    </Flex>
  );
}
