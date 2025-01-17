'use client';

import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import UserIndex from '@/components/user/list';
import { RoutesName } from '@/constants/index';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function TutorsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('User.index.title')}
          caption={t('User.index.caption')}
          label={t('User.index.createButton')}
          routeLink={RoutesName.user.create}
        />
        <UserIndex />
      </Space>
    </>
  );
}
