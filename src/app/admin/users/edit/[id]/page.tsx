'use client';

import GoToBack from '@/components/GoToBack';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import UserForm from '@/components/user/form/UserForm';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function CreatePatientPage() {
  const { t } = useTranslation();
  return (
    <>
      <Space direction="vertical" size={10}>
        <GoToBack />
        <HeaderContent title={t('User.form.edit.title')} />
        <UserForm isEdit />
      </Space>
    </>
  );
}
