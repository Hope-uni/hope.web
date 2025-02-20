'use client';

import PatientActions from '@/components/patient/list/PatientActions';
import Progress from '@/components/patient/record/MethodologyProgress';
import ObservationList from '@/components/patient/record/ObservationList';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import TutorActions from '@/components/tutor/list/TutorActions';
import CardProfile from '@/components/user/detail/CardProfile';
import { CreatePatientResponse, UserProfileCardSchema } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import {
  Descriptions,
  DescriptionsProps,
  Divider,
  Empty,
  Flex,
  Grid,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';

const { useBreakpoint } = Grid;

interface Props {
  patient: CreatePatientResponse;
  items: DescriptionsProps['items'];
  itemInfoTutor: DescriptionsProps['items'] | null;
  itemInfoTherapist: DescriptionsProps['items'] | null;
}

export default function RecordTab({
  items,
  patient,
  itemInfoTutor,
  itemInfoTherapist,
}: Props) {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  return (
    <>
      {screens.xs && (
        <>
          <Flex justify={screens.xs ? 'flex-start' : 'flex-end'}>
            <Flex vertical={screens.sm} align="center" justify="center">
              <Progress patient={patient} />
            </Flex>
          </Flex>
          <Divider
            dashed={true}
            style={{
              borderColor: '#626262',
              borderStyle: 'dashed',
              borderWidth: '2px 0 0',
            }}
          />
        </>
      )}
      <Descriptions
        layout="vertical"
        items={items}
        column={screens.sm ? 2 : 1}
        className="ant-descriptions_vertical"
      />
      <Divider
        dashed={true}
        style={{
          borderColor: '#626262',
          borderStyle: 'dashed',
          borderWidth: '2px 0 0',
        }}
      />
      <Flex vertical gap={10}>
        <Flex justify="space-between" align="center">
          <Typography.Title className={styles.title_content_tab}>
            {t('Patient.detail.title_observation')}
          </Typography.Title>
          <PatientActions patient={patient} renderMode="add_observation" />
        </Flex>
        {patient.observations && patient.observations?.length > 0 ? (
          <>
            <ObservationList observations={patient.observations} />
          </>
        ) : (
          <div className="col-center" style={{ gap: '20px' }}>
            <Empty
              description={t('Patient.detail.feedback.no_created_observation')}
              style={{ marginTop: 40 }}
            />
          </div>
        )}
      </Flex>
      {screens.xs && (
        <div>
          <Divider
            dashed={true}
            style={{
              borderColor: '#626262',
              borderStyle: 'dashed',
              borderWidth: '2px 0 0',
              margin: '15px 0 30px 0',
            }}
          />
          <CardProfile
            user={UserProfileCardSchema.parse(patient.tutor)}
            layout="vertical"
            title={t('Patient.detail.title_info_tutor')}
            infoDescription={itemInfoTutor}
            menuAction={
              <TutorActions
                tutor={patient.tutor}
                actions={['show']}
                classWrapper="popup_actions_primary_vertical"
              />
            }
          />
          <CardProfile
            user={UserProfileCardSchema.parse(patient.therapist)}
            layout="vertical"
            title={t('Patient.detail.title_info_therapist')}
            infoDescription={itemInfoTherapist}
            menuAction={
              <TherapistActions
                therapist={patient.therapist}
                actions={['show']}
                classWrapper="popup_actions_primary_vertical"
              />
            }
          />
        </div>
      )}
    </>
  );
}
