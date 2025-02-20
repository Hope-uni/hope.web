'use client';

import PatientActions from '@/components/patient/list/PatientActions';
import { DetailPatient, SinglePatientSchema } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import COLORS from '@/styles/modules/variablesExport.module.scss';
import { Flex, Grid, Progress, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { useBreakpoint } = Grid;

interface Props {
  patient: DetailPatient;
}

export default function MethodologyProgress({ patient }: Props) {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  return (
    <Flex vertical gap={10}>
      {screens.xs && (
        <Typography.Title className={styles.title_content_tab}>
          {t('Patient.detail.progress')}
        </Typography.Title>
      )}
      <Flex vertical={screens.sm} justify="center" align="center" gap={5}>
        <Flex>
          <Progress
            type="circle"
            percent={Number(patient?.phaseProgress)}
            strokeColor={COLORS.secondaryColor}
            size={67}
            strokeWidth={8}
            style={{
              fontWeight: 500,
            }}
          />
        </Flex>
        <Flex vertical gap={5}>
          <Flex gap={8} justify="center">
            <Typography.Text className={styles.progress_text}>
              {patient?.teaDegree?.name} |{' '}
              {t('Patient.detail.phase', { phase: patient?.currentPhase?.id })}
            </Typography.Text>
          </Flex>
          <PatientActions
            patient={SinglePatientSchema.parse(patient)}
            renderMode="next_phase"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
