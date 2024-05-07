'use client';

import PatientDetail from '@/components/patient/record';
import { useMemo } from 'react';
import { getPatientList } from '../../../../../../__mocks__/user';
import { Result } from 'antd';
import { Patient } from '@/models/schema';
import { useTranslations } from 'next-intl';

interface ParamsProps {
  params: { id: string };
}

export default function DetailPatientPage({ params }: ParamsProps) {
  const t = useTranslations('_.Status');
  const user = useMemo(() => {
    return getPatientList.data.find(
      (item: Patient) => item.id.toString() === params.id,
    );
  }, [params]);

  if (!user) {
    return <Result status="404" title="404" subTitle={t('result.code_404')} />;
  }

  return (
    <>
      <PatientDetail patient={user} />
    </>
  );
}
