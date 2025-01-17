'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import TherapistIndex from '@/components/therapist/list';
import { RoutesName } from '@/constants/index';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function TherapistsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Therapist.index.title')}
          caption={t('Therapist.index.caption')}
          label={t('Therapist.index.createButton')}
          routeLink={RoutesName.user.create}
        />
        <TherapistIndex />
      </Space>
    </>
  );
}
