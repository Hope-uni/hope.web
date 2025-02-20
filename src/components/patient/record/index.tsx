'use client';

import GoToBack from '@/components/GoToBack';
import Progress from '@/components/patient/record/MethodologyProgress';
import useDataPatient from '@/components/patient/record/useDetailPatient';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import TutorActions from '@/components/tutor/list/TutorActions';
import CardProfile from '@/components/user/detail/CardProfile';
import {
  CreatePatientResponse,
  ListTherapistResponseSchema,
  ListTutorResponseSchema,
  UserProfileCardSchema,
} from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import { Button, Col, Dropdown, Flex, Grid, Row, Switch, Tabs } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { HiCog6Tooth } from 'react-icons/hi2';
import PatientActions from '@/components/patient/list/PatientActions';

const { useBreakpoint } = Grid;

interface Props {
  patient: CreatePatientResponse;
}

export default function PatientDetail({ patient }: Props) {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const { itemInfoTherapist, itemInfoTutor, itemsTab } =
    useDataPatient(patient);

  const handleSwitchChange = (checked: boolean) => {
    // TODO implements api services
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
            {t('Actions.modebn')}
          </span>
          <Switch onChange={handleSwitchChange} size="small" />
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      <Row
        className={styles.wrapper_record}
        gutter={[30, 30]}
        style={{
          height: '100%',
        }}
      >
        <Col sm={17} xs={24}>
          <div
            className={styles.white_card_layout_vertical}
            style={{ gap: 30 }}
          >
            <Flex
              justify="space-between"
              align="center"
              style={{ width: '100%' }}
            >
              <GoToBack />
              <Flex gap={10} align="center">
                {screens.xs && (
                  <PatientActions
                    patient={patient}
                    actions={['edit', 'delete']}
                    classWrapper="popup_actions_primary_vertical"
                  />
                )}
                {screens.sm && (
                  <Flex gap={10}>
                    <Link href={`/admin/users/edit/${patient.userId}`}>
                      <Button type="default">{t('Actions.edit')}</Button>
                    </Link>
                    <PatientActions patient={patient} renderMode="delete" />
                  </Flex>
                )}
                <Dropdown trigger={['click']} dropdownRender={renderItem}>
                  <Flex gap={2} align="center">
                    <HiCog6Tooth size={'24px'} />
                    <BsFillCaretDownFill color="#626262" size={'16px'} />
                  </Flex>
                </Dropdown>
              </Flex>
            </Flex>

            <Flex
              justify={screens.sm ? 'space-between' : 'center'}
              align="flex-start"
              style={{ width: '100%' }}
            >
              <Col>
                <CardProfile user={UserProfileCardSchema.parse(patient)} />
              </Col>
              {screens.sm && (
                <Col>
                  <Flex justify="flex-end">
                    <Flex vertical align="center" justify="center">
                      <Progress patient={patient} />
                    </Flex>
                  </Flex>
                </Col>
              )}
            </Flex>

            <Tabs
              className="record-tab"
              defaultActiveKey="1"
              items={itemsTab}
              style={{ width: '100%' }}
            />
          </div>
        </Col>
        {screens.sm && (
          <Col sm={7} xs={24}>
            <Flex vertical gap={30}>
              <div className={styles.white_card_layout}>
                <CardProfile
                  user={UserProfileCardSchema.parse(patient.tutor)}
                  layout="vertical"
                  title={t('Patient.detail.title_info_tutor')}
                  infoDescription={itemInfoTutor}
                  menuAction={
                    <TutorActions
                      tutor={ListTutorResponseSchema.parse(patient.tutor)}
                      actions={['show']}
                      classWrapper="popup_actions_primary_vertical"
                    />
                  }
                />
              </div>
              <div className={styles.white_card_layout}>
                <CardProfile
                  user={UserProfileCardSchema.parse(patient.therapist)}
                  layout="vertical"
                  title={t('Patient.detail.title_info_therapist')}
                  infoDescription={itemInfoTherapist}
                  menuAction={
                    <TherapistActions
                      therapist={ListTherapistResponseSchema.parse(
                        patient.therapist,
                      )}
                      actions={['show']}
                      classWrapper="popup_actions_primary_vertical"
                    />
                  }
                />
              </div>
            </Flex>
          </Col>
        )}
      </Row>
    </>
  );
}
