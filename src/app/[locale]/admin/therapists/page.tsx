import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import TherapistIndex from '@/components/therapist/list';
import { RoutesName } from '@/constants/Menu';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function TherapistsPage() {
  const t = useTranslations('_.Therapist');
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('index.title')}
          caption={t('index.caption')}
          label={t('index.createButton')}
          routeLink={RoutesName.user.create}
        />
        <TherapistIndex />
      </Space>
    </>
  );
}
