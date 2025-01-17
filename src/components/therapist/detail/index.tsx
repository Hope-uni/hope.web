'use client';

import GoToBack from '@/components/GoToBack';
import { useActivityColumns } from '@/components/activity/list/ActivityColumn';
import { usePatientColumns } from '@/components/patient/list/PatientColumn';
import WrapperTable from '@/components/table/Wrappertable';
import CardProfile from '@/components/user/detail/CardProfile';
import { Therapist } from '@/models/schema';
import styles from '@/styles/modules/therapist.module.scss';
import {
  Button,
  Col,
  Descriptions,
  Flex,
  Row,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import { DescriptionsProps } from 'antd/lib';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPersonBadge } from 'react-icons/bs';
import { FaChildren } from 'react-icons/fa6';
import { getActivitiesList, getPatientList } from '../../../../__mocks__/user';

const { Title } = Typography;

interface Props {
  therapist: Therapist;
}

interface GeneralInfoProps {
  items: DescriptionsProps['items'];
}

const GeneralInfo = ({ items }: GeneralInfoProps) => {
  return (
    <Row gutter={[30, 30]}>
      <Col span={19}>
        <Descriptions
          layout="vertical"
          items={items}
          column={3}
          className="ant-descriptions_vertical"
        />
      </Col>
    </Row>
  );
};

export default function TherapistDetail({ therapist }: Props) {
  const { t } = useTranslation();
  const [patientColumns] = usePatientColumns();
  const [activityColumns] = useActivityColumns();

  // TODO data quemada por mientras
  const items: DescriptionsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('Therapist.detail.description_labels.email'),
        children: 'marioramos@gamil.com',
      },
      {
        key: '2',
        label: t('Therapist.detail.description_labels.identification'),
        children: '001-124599-4258D',
      },
      {
        key: '3',
        label: t('Therapist.detail.description_labels.phone'),
        children: '8888 8888',
      },
      {
        key: '4',
        label: t('Therapist.detail.description_labels.address'),
        span: 3,
        children:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      },
    ],
    [t],
  );

  const itemsTab: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('Therapist.detail.tabs.generl_info'),
        icon: <BsPersonBadge size={20} />,
        children: <GeneralInfo items={items} />,
      },
      {
        key: '2',
        label: t('Therapist.detail.tabs.children_in_charge'),
        icon: <FaChildren size={20} />,
        children: (
          <Flex vertical className={styles.pictogram_list} gap={30}>
            <Title className={styles.title_content_tab}>
              {t('Therapist.detail.title_children_in_charge')}
            </Title>
            <WrapperTable cols={patientColumns} data={getPatientList.data} />
          </Flex>
        ),
      },
      {
        key: '3',
        label: t('Therapist.detail.tabs.children_in_charge'),
        icon: <FaChildren size={20} />,
        children: (
          <Flex vertical className={styles.pictogram_list} gap={30}>
            <Title className={styles.title_content_tab}>
              {t('Therapist.detail.title_children_in_charge')}
            </Title>
            <WrapperTable
              cols={activityColumns}
              data={getActivitiesList.data}
            />
          </Flex>
        ),
      },
    ],
    [activityColumns, items, patientColumns, t],
  );

  return (
    <>
      <Flex
        vertical
        justify="flex-start"
        gap={30}
        className={styles.wrapper_detail}
      >
        <Flex justify="space-between" align="flex-start">
          <GoToBack />
          <Flex gap={10} align="center">
            <Button type="default">{t('Actions.edit')}</Button>
            <Button type="default">{t('Actions.assign_patient')}</Button>
            <Button className="default-error-color" type="default">
              {t('Actions.delete')}
            </Button>
          </Flex>
        </Flex>

        <CardProfile user={{ ...therapist, ...therapist.user }} showUser />

        <Tabs className="record-tab" defaultActiveKey="1" items={itemsTab} />
      </Flex>
    </>
  );
}
