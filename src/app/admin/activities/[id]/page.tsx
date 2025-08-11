'use client';

import ActivityDetail from '@/components/activity/detail';
import GoToBack from '@/components/GoToBack';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { useFetchFindActivityByIdQuery } from '@/lib/queries/activity';
import { LoadingOutlined } from '@ant-design/icons';
import { Result, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ParamsProps {
  params: { id: string };
}

export default function DetailActivityPage({ params }: ParamsProps) {
  const { t } = useTranslation();
  const [activityNotFound, setActivityNotFound] = useState(false);

  const { data, isLoading } = useFetchFindActivityByIdQuery(Number(params.id));

  useEffect(() => {
    setActivityNotFound(!data?.data);
  }, [data?.data, activityNotFound]);

  return (
    <>
      {!isLoading && data ? (
        <>
          {!!data?.data ? (
            <Space direction="vertical" size={10}>
              <GoToBack />
              <HeaderContent title={t('Activity.actions.detail.modal.title')} />
              <Space direction="vertical" size={10} />
              <ActivityDetail activity={data.data} />
            </Space>
          ) : (
            <Result
              status="404"
              title="404"
              subTitle={
                data.message ?? t('Activity.form.feedback.activity_not_found')
              }
            />
          )}
        </>
      ) : (
        //TODO change by skeleton
        <Spin fullscreen indicator={<LoadingOutlined spin />} size="large" />
      )}
    </>
  );
}
