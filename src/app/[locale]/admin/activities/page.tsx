import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import ActivityIndex from '@/components/activity/list';
import { RoutesName } from '@/constants/Menu';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function ActivitiesPage() {
  const t = useTranslations('_.Activity');
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('index.title')}
          caption={t('index.caption')}
          label={t('index.createButton')}
          routeLink={RoutesName.user.create}
        />
        <ActivityIndex />
      </Space>
    </>
  );
}
