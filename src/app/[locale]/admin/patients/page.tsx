import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import PatientIndex from '@/components/patient/list';
import { RoutesName } from '@/constants/index';
import { Space } from 'antd';
import { useTranslations } from 'next-intl';

export default function PatientsPage() {
  const t = useTranslations('_.Patient');
  return (
    <>
      <Space direction="vertical" size={10}>
        <HeaderContent
          title={t('index.title')}
          caption={t('index.caption')}
          label={t('index.createButton')}
          routeLink={RoutesName.user.create}
        />
        <PatientIndex />
      </Space>
    </>
  );
}
