'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import PatientIndex from '@/components/patient/list';
import { RoutesName } from '@/constants/index';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function PatientsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Patient.index.title')}
          caption={t('Patient.index.caption')}
          label={t('Patient.index.createButton')}
          routeLink={RoutesName.user.create}
        />
        <PatientIndex />
      </Space>
    </>
  );
}
