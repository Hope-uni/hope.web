'use client';

import TutorDetail from '@/components/tutor/detail';
import { Tutor } from '@/models/schema';
import { Result } from 'antd';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { getPatientList } from '../../../../../../__mocks__/user';

interface ParamsProps {
  params: { id: string };
}

export default function DetailTutorPage({ params }: ParamsProps) {
  const t = useTranslations('_.Status');
  const tutor = useMemo(() => {
    return getPatientList.data.find(
      (item: Tutor) => item.id.toString() === params.id,
    ); //TODO cambiar a un servicio conectado a la api
  }, [params]);

  if (!tutor) {
    return <Result status="404" title="404" subTitle={t('result.code_404')} />;
  }

  return (
    <>
      <TutorDetail tutor={tutor} />
    </>
  );
}
