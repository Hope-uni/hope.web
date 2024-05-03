'use client';

import PatientDetail from '@/components/patient/record';
import { useMemo } from 'react';
import { getPatientList } from '../../../../../../__mocks__/user';
import { Button, Result } from 'antd';
import { Patient } from '@/models/schema';

interface ParamsProps {
  params: { id: string };
}

export default function DetailPatientPage({ params }: ParamsProps) {
  const user = useMemo(() => {
    return getPatientList.data.find(
      (item: Patient) => item.id.toString() === params.id,
    );
  }, [params]);

  if (!user) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    );
  }

  return (
    <>
      <PatientDetail patient={user} />
    </>
  );
}
