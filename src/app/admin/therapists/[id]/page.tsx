'use client';

import TherapistDetail from '@/components/therapist/detail';
import { ROLES } from '@/constants/Role';
import { useFetchFindUserByRoleQuery } from '@/lib/queries/user';
import { DetailTherapist } from '@/models/schema';
import { LoadingOutlined } from '@ant-design/icons';
import { Result, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ParamsProps {
  params: { id: string };
}

export default function DetailTherapistPage({ params }: ParamsProps) {
  const { t } = useTranslation();
  const [userNotFound, setUserNotFound] = useState(false);

  const { data, isLoading } = useFetchFindUserByRoleQuery<DetailTherapist>(
    ROLES.THERAPIST,
    params.id,
  );

  useEffect(() => {
    setUserNotFound(!data?.data);
  }, [data?.data, userNotFound]);

  return (
    <>
      <>
        {!isLoading && data ? (
          <>
            {!!data?.data ? (
              <TherapistDetail therapist={data.data} />
            ) : (
              <Result
                status="404"
                title="404"
                subTitle={
                  data.message ?? t('User.form.feedback.user_not_found')
                }
              />
            )}
          </>
        ) : (
          //TODO change by skeleton
          <Spin fullscreen indicator={<LoadingOutlined spin />} size="large" />
        )}
      </>
    </>
  );
}
