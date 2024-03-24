import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function TutorsPage() {
  const t = useTranslations('_.Tutor');
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent title={t('index.title')} caption={t('index.caption')} />
      </Space>
    </>
  );
}
