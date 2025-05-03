'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import AchievementIndex from '@/components/achievement/list';
import AchievementActions from '@/components/achievement/list/AchievementActions';

export default function TherapistsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Achievement.index.title')}
          caption={t('Achievement.index.caption')}
          customBtn={<AchievementActions renderMode="add_achievement" />}
        />
        <AchievementIndex />
      </Space>
    </>
  );
}
