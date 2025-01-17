'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function TherapistsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Achievement.index.title')}
          caption={t('Achievement.index.caption')}
        />
      </Space>
    </>
  );
}
