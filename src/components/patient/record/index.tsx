'use client';

import UserVerificationAlert from '@/components/common/Alerts/UserNotVerifiedAlert';
import GoToBack from '@/components/GoToBack';
import PatientActions from '@/components/patient/list/PatientActions';
import Progress from '@/components/patient/record/MethodologyProgress';
import useDataPatient from '@/components/patient/record/useDetailPatient';
import { RENDER_MODE_ACTION } from '@/components/table/helpers';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import TutorActions from '@/components/tutor/list/TutorActions';
import CardProfile from '@/components/user/detail/CardProfile';
import { ROLES_KEYS } from '@/constants/guards';
import {
  DetailPatient,
  SinglePatientSchema,
  SingleTutorTherapistSchema,
  UserProfileCardSchema,
} from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import { validateOptional } from '@/utils/zod';
import { Button, Col, Dropdown, Flex, Grid, Row, Tabs } from 'antd';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { HiCog6Tooth } from 'react-icons/hi2';

const { useBreakpoint } = Grid;

interface Props {
  patient: DetailPatient;
}

export default function PatientDetail({ patient }: Props) {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const [openMenuConfig, setOpenMenuConfig] = useState(false);
  const { itemInfoTherapist, itemInfoTutor, itemsTab } =
    useDataPatient(patient);

  const therapistValidatedSchema = useMemo(
    () => validateOptional(SingleTutorTherapistSchema, patient.therapist),
    [patient.therapist],
  );

  const handleVisibilityMenuConfig = (flag: boolean) => {
    setOpenMenuConfig(flag);
  };

  const handleCloseMenuConfig = () => {
    setOpenMenuConfig(false);
  };

  const renderItem = () => {
    return (
      <Flex
        className={`popup-actions-dropdown ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical`}
        role="menu"
        data-menu-list="true"
      >
        <PatientActions
          patient={SinglePatientSchema.parse(patient)}
          patientDetail={patient}
          renderMode="change_monochrome"
          onAfterActionFinish={handleCloseMenuConfig}
        />
      </Flex>
    );
  };

  return (
    <>
      <UserVerificationAlert isVerified={patient.isVerified} />
      <Row
        className={styles.wrapper_record}
        gutter={[30, 30]}
        style={{
          height: '100%',
        }}
      >
        <Col md={17} xs={24} sm={24}>
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
                    patient={SinglePatientSchema.parse(patient)}
                    actions={['edit', 'delete']}
                    classWrapper="popup_actions_primary_vertical"
                  />
                )}
                {screens.sm && (
                  <Flex gap={10}>
                    <Link href={`/admin/users/edit/${patient.userId}`}>
                      <Button type="default" disabled={!patient.isVerified}>
                        {t('Actions.edit')}
                      </Button>
                    </Link>
                    <PatientActions
                      patient={SinglePatientSchema.parse(patient)}
                      renderMode={RENDER_MODE_ACTION.DELETE}
                    />
                  </Flex>
                )}
                <Dropdown
                  trigger={['click']}
                  dropdownRender={renderItem}
                  open={openMenuConfig}
                  onOpenChange={(flag) => handleVisibilityMenuConfig(flag)}
                >
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
                <CardProfile
                  user={UserProfileCardSchema.parse(patient)}
                  roleName={ROLES_KEYS.PATIENT}
                />
              </Col>
              {screens.lg && (
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
        {
          <Col md={7} xs={24} sm={24}>
            <Flex vertical gap={30}>
              <div className={styles.white_card_layout}>
                <CardProfile
                  user={UserProfileCardSchema.parse(patient.tutor)}
                  layout="vertical"
                  title={t('Patient.detail.title_info_tutor')}
                  infoDescription={itemInfoTutor}
                  menuAction={
                    <TutorActions
                      tutor={SingleTutorTherapistSchema.parse(patient.tutor)}
                      actions={['show']}
                      classWrapper="popup_actions_primary_vertical"
                    />
                  }
                />
              </div>
              <div className={styles.white_card_layout}>
                <CardProfile
                  user={therapistValidatedSchema}
                  layout="vertical"
                  title={t('Patient.detail.title_info_therapist')}
                  infoDescription={itemInfoTherapist}
                  menuAction={
                    therapistValidatedSchema ? (
                      <TherapistActions
                        therapist={therapistValidatedSchema}
                        actions={['show']}
                        classWrapper="popup_actions_primary_vertical"
                      />
                    ) : undefined
                  }
                />
              </div>
            </Flex>
          </Col>
        }
      </Row>
    </>
  );
}
