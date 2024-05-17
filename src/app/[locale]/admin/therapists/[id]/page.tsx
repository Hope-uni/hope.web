'use client';

import TherapistDetail from '@/components/therapist/detail';
import { Therapist } from '@/models/schema';
import { Result } from 'antd';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { getPatientList } from '../../../../../../__mocks__/user';

interface ParamsProps {
  params: { id: string };
}

export default function DetailTherapistPage({ params }: ParamsProps) {
  const t = useTranslations('_.Status');
  const therapist = useMemo(() => {
    return getPatientList.data.find(
      (item: Therapist) => item.id.toString() === params.id,
    ); //TODO cambiar a un servicio conectado a la api
  }, [params]);

  if (!therapist) {
    return <Result status="404" title="404" subTitle={t('result.code_404')} />;
  }

  return (
    <>
      <TherapistDetail therapist={therapist} />
    </>
  );
}
