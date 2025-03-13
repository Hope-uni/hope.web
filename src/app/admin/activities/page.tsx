'use client';

import ActivityIndex from '@/components/activity/list';
import ActivityActions from '@/components/activity/list/ActivityActions';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
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
          customBtn={<ActivityActions renderMode="add_activity" />}
        />
        <ActivityIndex />
      </Space>
    </>
  );
}
