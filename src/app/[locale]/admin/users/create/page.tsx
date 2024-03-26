import GoToBack from '@/components/GoToBack';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import CreateUserForm from '@/components/user/form/CreateUserFormMultiStep';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function CreatePatientPage() {
  const t = useTranslations('_.User');
  return (
    <>
      <Space direction="vertical" size={10}>
        <GoToBack />
        <HeaderContent
          title={t('form.create.title')}
          caption={t('form.create.caption')}
        />
        <CreateUserForm />
      </Space>
    </>
  );
}
