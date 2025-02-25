'use client';

import CategoryIndex from '@/components/category/list';
import CategoryActions from '@/components/category/list/CategoryActions';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function TherapistsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Category.index.title')}
          caption={t('Category.index.caption')}
          customBtn={<CategoryActions renderMode="add_category" />}
        />
      </Space>
      <CategoryIndex />
    </>
  );
}
