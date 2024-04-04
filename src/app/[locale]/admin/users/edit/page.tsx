import GoToBack from '@/components/GoToBack';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import UserForm from '@/components/user/form/UserForm';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function CreatePatientPage() {
  const t = useTranslations('_.User');
  return (
    <>
      <Space direction="vertical" size={10}>
        <GoToBack />
        <HeaderContent title={t('form.edit.title')} />
        <UserForm isEdit />
      </Space>
    </>
  );
}
