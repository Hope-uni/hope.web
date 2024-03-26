import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function TherapistsPage() {
  const t = useTranslations('_.Activity');
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent title={t('index.title')} caption={t('index.caption')} />
      </Space>
    </>
  );
}
