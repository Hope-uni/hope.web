'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import RoleIndex from '@/components/role/list';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function TherapistsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Role.index.title')}
          caption={t('Role.index.caption')}
        />
      </Space>
      <RoleIndex />
    </>
  );
}
