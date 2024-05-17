'use client';

import GoToBack from '@/components/GoToBack';
import { usePatientColumns } from '@/components/patient/list/PatientColumn';
import WrapperTable from '@/components/table/Wrappertable';
import CardProfile from '@/components/user/detail/CardProfile';
import { Tutor } from '@/models/schema';
import styles from '@/styles/modules/tutor.module.scss';
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
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { BsPersonBadge } from 'react-icons/bs';
import { FaChildren } from 'react-icons/fa6';
import { getPatientList } from '../../../../__mocks__/user';

const { Title } = Typography;

interface Props {
  tutor: Tutor;
}

interface GeneralInfoProps {
  items: DescriptionsProps['items'];
}

const GeneralInfo = ({ items }: GeneralInfoProps) => {
  return (
    <Row gutter={[30, 30]}>
      <Col span={18}>
        <Descriptions
          layout="vertical"
          items={items}
          column={2}
          className="ant-descriptions_vertical"
        />
      </Col>
    </Row>
  );
};

export default function TutorDetail({ tutor }: Props) {
  const t = useTranslations('_.Tutor');
  const t_actions = useTranslations('_.Actions');
  const [columns] = usePatientColumns();

  // TODO data quemada por mientras
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('detail.description_labels.phone'),
      children: '8888 8888',
    },
    {
      key: '2',
      label: t('detail.description_labels.telephone'),
      children: '2225 1234',
    },
    {
      key: '3',
      label: t('detail.description_labels.email'),
      span: 2,
      children: 'marioramos@gamil.com',
    },
    {
      key: '4',
      label: t('detail.description_labels.address'),
      span: 2,
      children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
  ];

  const itemsTab: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('detail.tabs.generl_info'),
        icon: <BsPersonBadge size={20} />,
        children: <GeneralInfo items={items} />,
      },
      {
        key: '2',
        label: t('detail.tabs.children_in_charge'),
        icon: <FaChildren size={20} />,
        children: (
          <Flex vertical className={styles.pictogram_list} gap={30}>
            <Title className={styles.title_content_tab}>
              {t('detail.title_children_in_charge')}
            </Title>
            <WrapperTable cols={columns} data={getPatientList.data} />
          </Flex>
        ),
      },
    ],
    [],
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
            <Button type="default">{t_actions('edit')}</Button>
            <Button className="default-error-color" type="default">
              {t_actions('delete')}
            </Button>
          </Flex>
        </Flex>

        <CardProfile user={{ ...tutor, ...tutor.user }} showUser />

        <Tabs className="record-tab" defaultActiveKey="1" items={itemsTab} />
      </Flex>
    </>
  );
}
