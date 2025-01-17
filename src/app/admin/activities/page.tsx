'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import ActivityIndex from '@/components/activity/list';
import { RoutesName } from '@/constants/index';
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
          routeLink={RoutesName.user.create}
        />
        <ActivityIndex />
      </Space>
    </>
  );
}
