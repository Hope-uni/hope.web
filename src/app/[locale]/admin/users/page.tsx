import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { RoutesName } from '@/constants/Menu';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function TutorsPage() {
  const t = useTranslations('_.User');
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('index.title')}
          caption={t('index.caption')}
          label="Crear usuario"
          routeLink={RoutesName.user.create}
        />
      </Space>
    </>
  );
}
