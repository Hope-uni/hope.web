import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import TutorIndex from '@/components/tutor/list';
import { RoutesName } from '@/constants/Menu';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function TutorsPage() {
  const t = useTranslations('_.Tutor');
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('index.title')}
          caption={t('index.caption')}
          label={t('index.createButton')}
          routeLink={RoutesName.user.create}
        />
        <TutorIndex />
      </Space>
    </>
  );
}
