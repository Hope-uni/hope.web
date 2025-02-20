import { useActivityColumns } from '@/components/activity/list/ActivityColumn';
import { usePatientColumns } from '@/components/patient/list/PatientColumn';
import WrapperTable from '@/components/table/Wrappertable';
import { CreateTherapistResponse } from '@/models/schema';
import styles from '@/styles/modules/therapist.module.scss';
import {
  Col,
  Descriptions,
  DescriptionsProps,
  Empty,
  Flex,
  Grid,
  Row,
  Typography,
} from 'antd';
import { TabsProps } from 'antd/lib';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPersonBadge } from 'react-icons/bs';
import { FaChildren } from 'react-icons/fa6';

dayjs.locale('es');

const { useBreakpoint } = Grid;
const { Title } = Typography;

const useDetailTherapist = (therapist: CreateTherapistResponse) => {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const [patientColumns] = usePatientColumns();
  const [activityColumns] = useActivityColumns();

  const itemsGeneralInfo: DescriptionsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('Therapist.detail.description_labels.email'),
        children: therapist.email,
      },
      {
        key: '2',
        label: t('Therapist.detail.description_labels.identification'),
        children: therapist.identificationNumber,
      },
      {
        key: '3',
        label: t('Therapist.detail.description_labels.phone'),
        children: therapist.phoneNumber,
      },
      {
        key: '4',
        label: t('Therapist.detail.description_labels.address'),
        span: 3,
        children: therapist.address,
      },
    ],
    [
      t,
      therapist.address,
      therapist.email,
      therapist.identificationNumber,
      therapist.phoneNumber,
    ],
  );

  const itemsTab: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('Therapist.detail.tabs.generl_info'),
        icon: <BsPersonBadge size={20} />,
        children: (
          <>
            <Row gutter={[30, 30]}>
              <Col span={19}>
                <Descriptions
                  layout="vertical"
                  items={itemsGeneralInfo}
                  column={3}
                  className="ant-descriptions_vertical"
                />
              </Col>
            </Row>
          </>
        ),
      },
      {
        key: '2',
        label: t('Therapist.detail.tabs.children_in_charge'),
        icon: <FaChildren size={20} />,
        children: (
          <Flex vertical className={styles.pictogram_list} gap={30}>
            {therapist?.children && therapist?.children?.length > 0 ? (
              <>
                <Title className={styles.title_content_tab}>
                  {t('Therapist.detail.title_children_in_charge')}
                </Title>
                <WrapperTable
                  cols={patientColumns}
                  data={therapist.children}
                  showTitle={false}
                  pagination={false}
                />
              </>
            ) : (
              <Empty
                description={t(
                  'Therapist.detail.feedback.no_children_not_assigned',
                )}
                style={{ marginTop: 30 }}
              />
            )}
          </Flex>
        ),
      },
      {
        key: '3',
        label: t('Therapist.detail.tabs.activities_created'),
        icon: <FaChildren size={20} />,
        children: (
          <Flex vertical className={styles.pictogram_list} gap={30}>
            {therapist?.activities && therapist?.activities?.length > 0 ? (
              <>
                <Title className={styles.title_content_tab}>
                  {t('Therapist.detail.title_activities_created')}
                </Title>
                <WrapperTable
                  cols={activityColumns}
                  data={therapist.activities}
                  showTitle={false}
                  pagination={false}
                />
              </>
            ) : (
              <Empty
                description={t(
                  'Therapist.detail.feedback.current_activity_not_created',
                )}
                style={{ marginTop: 30 }}
              />
            )}
          </Flex>
        ),
      },
    ],
    [
      activityColumns,
      itemsGeneralInfo,
      patientColumns,
      t,
      therapist.activities,
      therapist.children,
    ],
  );

  return {
    itemsGeneralInfo,
    itemsTab,
  };
};

export default useDetailTherapist;
