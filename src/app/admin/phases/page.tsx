'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import PhaseIndex from '@/components/phase/list';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function PhasesPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Phase.index.title')}
          caption={t('Phase.index.caption')}
        />
      </Space>
      <PhaseIndex />
    </>
  );
}
