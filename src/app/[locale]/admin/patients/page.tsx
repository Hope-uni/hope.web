import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function PatientsPage() {
  const t = useTranslations('_.User');
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent title={t('index.title')} caption={t('index.caption')} />
      </Space>
    </>
  );
}
