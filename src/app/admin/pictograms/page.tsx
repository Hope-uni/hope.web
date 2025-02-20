'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import PatientIndex from '@/components/pictogram/list';
import { RoutesName } from '@/constants';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function TherapistsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Pictogram.index.title')}
          caption={t('Pictogram.index.caption')}
          label={t('Pictogram.index.createButton')}
          routeLink={RoutesName.pictogram.create}
        />
      </Space>
      <PatientIndex />
    </>
  );
}
