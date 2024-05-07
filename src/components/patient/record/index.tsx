'use client';

import GoToBack from '@/components/GoToBack';
import Progress from '@/components/patient/record/MethodologyProgress';
import ActivityTab from '@/components/patient/record/tabs/ActivitiesTab';
import RecordTab from '@/components/patient/record/tabs/RecordTab';
import CardProfile from '@/components/user/detail/CardProfile';
import { Patient } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import {
  Button,
  Col,
  Dropdown,
  Flex,
  Row,
  Switch,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import { DescriptionsProps } from 'antd/lib';
import { useTranslations } from 'next-intl';
import {
  BsAward,
  BsCardChecklist,
  BsChevronDoubleUp,
  BsFillCaretDownFill,
  BsImages,
  BsPersonBadge,
} from 'react-icons/bs';
import { HiCog6Tooth } from 'react-icons/hi2';
import {
  getActivitiesList,
  getObservationList,
  getPictogramsList,
  getAchievementList,
} from '../../../../__mocks__/user';
import PictogramTab from '@/components/patient/record/tabs/PictogramTab';
import AchievementTab from '@/components/patient/record/tabs/AchievementTab';
import { useMemo } from 'react';

interface Props {
  patient: Patient;
}

export default function PatientDetail({ patient }: Props) {
  const t = useTranslations('_.Patient');
  const t_actions = useTranslations('_.Actions');

  const handleSwitchChange = (checked: boolean) => {
    console.log(checked);
  };

  const renderItem = () => {
    return (
      <Flex
        className={`popup-actions-dropdown ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical`}
        role="menu"
        data-menu-list="true"
      >
        <Flex
          gap={30}
          className={`ant-dropdown-menu-item text-color-grey`}
          role="menuitem"
          key={'b/n-switch'}
        >
          <span className="ant-dropdown-menu-title-content">
            {t_actions('modebn')}
          </span>
          <Switch onChange={handleSwitchChange} size="small" />
        </Flex>
      </Flex>
    );
  };

  // TODO data quemada por mientras
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Fecha denacimiento',
      children: '11 de mayo 1999',
    },
    {
      key: '2',
      label: 'Teléfono de casa',
      children: '2225 1234',
    },
    {
      key: '3',
      label: 'Dirección',
      span: 2,
      children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
  ];

  // TODO data quemada por mientras
  const itemInfoTutor: DescriptionsProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Correo',
        children: 'samuelbarberena12@gmail.com',
      },
      {
        key: '2',
        label: 'Teléfono',
        children: '8888 8888',
      },
    ];
  }, []);

  // TODO data quemada por mientras
  const itemInfoTherapist: DescriptionsProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Correo',
        children: 'walterwhiteelmeromero@gmail.com',
      },
      {
        key: '2',
        label: 'Teléfono',
        children: '8888 9999',
      },
    ];
  }, []);

  const itemsTab: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('detail.tabs.record_tab'),
        icon: <BsPersonBadge size={20} />,
        children: <RecordTab items={items} observations={getObservationList} />,
      },
      {
        key: '2',
        label: t('detail.tabs.actividades_tab'),
        icon: <BsCardChecklist size={20} />,
        children: <ActivityTab activities={getActivitiesList} />,
      },
      {
        key: '3',
        label: t('detail.tabs.pictogramas_tab'),
        icon: <BsImages size={20} />,
        children: <PictogramTab pictograms={getPictogramsList} />,
      },
      {
        key: '4',
        label: t('detail.tabs.logros_tab'),
        icon: <BsAward size={20} />,
        children: <AchievementTab achievements={getAchievementList} />,
      },
    ],
    [patient],
  );

  return (
    <>
      <Row
        className={styles.wrapper_record}
        gutter={[30, 30]}
        style={{
          height: '100%',
        }}
      >
        <Col span={17}>
          <Flex
            vertical
            className={styles.white_card_layout}
            justify="flex-start"
            gap={30}
          >
            <Flex justify="space-between" align="flex-start">
              <GoToBack />
              <Flex gap={10} align="center">
                <Button type="default">{t_actions('edit')}</Button>
                <Button className="default-error-color" type="default">
                  {t_actions('delete')}
                </Button>
                <Dropdown trigger={['click']} dropdownRender={renderItem}>
                  <Flex gap={2} align="center">
                    <HiCog6Tooth size={'24px'} />
                    <BsFillCaretDownFill color="#626262" size={'16px'} />
                  </Flex>
                </Dropdown>
              </Flex>
            </Flex>

            <Flex justify="space-between" align="flex-start">
              <CardProfile user={{ ...patient, ...patient.user }} />
              <Flex justify="flex-end">
                <Flex vertical align="center" justify="center">
                  <Progress percent={75} grade={3} phase={2} />
                  <Flex className={styles.upgrade_phase} gap={4}>
                    <BsChevronDoubleUp size="18px" />
                    <Typography.Text
                      underline
                      className={styles.upgrade_phase_text}
                    >
                      {t_actions('Upload_phase')}
                    </Typography.Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Tabs
              className="record-tab"
              defaultActiveKey="1"
              items={itemsTab}
            />
          </Flex>
        </Col>
        <Col span={7}>
          <Flex vertical gap={30}>
            <Flex className={styles.white_card_layout} align="flex-start">
              <CardProfile
                user={{ ...patient, ...patient.user }}
                layout="vertical"
                title={t('detail.title_info_tutor')}
                infoDescription={itemInfoTutor}
              />
            </Flex>
            <Flex className={styles.white_card_layout} align="flex-start">
              <CardProfile
                user={{ ...patient, ...patient.user }}
                layout="vertical"
                title={t('detail.title_info_therapist')}
                infoDescription={itemInfoTherapist}
              />
            </Flex>
          </Flex>
        </Col>
      </Row>
    </>
  );
}
