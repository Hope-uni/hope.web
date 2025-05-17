'use client';

import ActivityIndex from '@/components/activity/list';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { RoutesName } from '@/constants';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function ActivitiesPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Activity.index.title')}
          caption={t('Activity.index.caption')}
          label={t('Activity.index.createButton')}
          routeLink={RoutesName.activity.create}
        />
        <ActivityIndex />
      </Space>
    </>
  );
}
