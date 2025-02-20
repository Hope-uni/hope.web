import { usePatientColumns } from '@/components/patient/list/PatientColumn';
import WrapperTable from '@/components/table/Wrappertable';
import { CreateTutorResponse } from '@/models/schema';
import styles from '@/styles/modules/tutor.module.scss';
import {
  Col,
  Descriptions,
  DescriptionsProps,
  Flex,
  Row,
  Typography,
  Grid,
  Empty,
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

const useDetailTutor = (tutor: CreateTutorResponse) => {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const [columns] = usePatientColumns();

  const itemsGeneralInfo: DescriptionsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('Tutor.detail.description_labels.phone'),
        span: screens.xs ? 2 : 1,
        children: tutor.phoneNumber,
      },
      {
        key: '2',
        label: t('Tutor.detail.description_labels.telephone'),
        span: screens.xs ? 2 : 1,
        children: tutor.telephone,
      },
      {
        key: '3',
        label: t('Tutor.detail.description_labels.email'),
        span: 2,
        children: tutor.email,
      },
      {
        key: '4',
        label: t('Tutor.detail.description_labels.address'),
        span: 2,
        children: tutor.address,
      },
    ],
    [
      screens.xs,
      t,
      tutor.address,
      tutor.email,
      tutor.phoneNumber,
      tutor.telephone,
    ],
  );

  const itemsTab: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('Tutor.detail.tabs.generl_info'),
        icon: <BsPersonBadge size={20} />,
        children: (
          <Row gutter={[30, 30]}>
            <Col span={18}>
              <Descriptions
                layout="vertical"
                items={itemsGeneralInfo}
                column={2}
                className="ant-descriptions_vertical"
              />
            </Col>
          </Row>
        ),
      },
      {
        key: '2',
        label: t('Tutor.detail.tabs.children_in_charge'),
        icon: <FaChildren size={20} />,
        children: (
          <Flex vertical className={styles.pictogram_list} gap={10}>
            <Title className={styles.title_content_tab}>
              {t('Tutor.detail.title_children_in_charge')}
            </Title>
            {tutor?.children && tutor?.children?.length > 0 ? (
              <WrapperTable
                cols={columns}
                data={{ data: tutor.children }}
                pagination={false}
                showTitle={false}
              />
            ) : (
              <Empty
                description={t(
                  'Tutor.detail.feedback.no_children_not_assigned',
                )}
                style={{ marginTop: 30 }}
              />
            )}
          </Flex>
        ),
      },
    ],
    [columns, itemsGeneralInfo, t, tutor.children],
  );

  return {
    itemsGeneralInfo,
    itemsTab,
  };
};

export default useDetailTutor;
