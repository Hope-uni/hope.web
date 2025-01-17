'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import TutorIndex from '@/components/tutor/list';
import { RoutesName } from '@/constants/index';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function TutorsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('Tutor.index.title')}
          caption={t('Tutor.index.caption')}
          label={t('Tutor.index.createButton')}
          routeLink={RoutesName.user.create}
        />
        <TutorIndex />
      </Space>
    </>
  );
}
