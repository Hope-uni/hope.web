import AchievementTab from '@/components/patient/record/tabs/AchievementTab';
import ActivityTab from '@/components/patient/record/tabs/ActivitiesTab';
import PictogramTab from '@/components/patient/record/tabs/PictogramTab';
import RecordTab from '@/components/patient/record/tabs/RecordTab';
import { DetailPatient } from '@/models/schema';
import { DescriptionsProps, Grid } from 'antd';
import { TabsProps } from 'antd/lib';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsAward,
  BsCardChecklist,
  BsImages,
  BsPersonBadge,
} from 'react-icons/bs';

dayjs.locale('es');

const { useBreakpoint } = Grid;

const useDataPatient = (patient: DetailPatient) => {
  const screens = useBreakpoint();
  const { t } = useTranslation();

  const itemsGeneralInfo: DescriptionsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('Patient.detail.description_patient.birthday'),
        children: dayjs(patient.birthday).format('DD [de] MMMM YYYY'),
      },
      {
        key: '2',
        label: t('Patient.detail.description_patient.telephone'),
        children: patient.telephone,
      },
      {
        key: '3',
        label: t('Patient.detail.description_patient.address'),
        span: 2,
        children: patient.address,
      },
    ],
    [patient.address, patient.birthday, patient.telephone, t],
  );

  const itemInfoTutor: DescriptionsProps['items'] | null = useMemo(() => {
    if (!patient.tutor) {
      return null;
    }

    let items: DescriptionsProps['items'] = [];

    if (screens.xs) {
      items.push({
        key: '1',
        label: t('Patient.detail.card_profile.info_descriptions.email'),
        children: patient.tutor.fullName,
      });
    }

    items.push(
      {
        key: '1',
        label: t('Patient.detail.card_profile.info_descriptions.email'),
        children: patient.tutor.email,
      },
      {
        key: '2',
        label: t('Patient.detail.card_profile.info_descriptions.telephone'),
        children: patient.tutor.telephone,
      },
    );

    return items;
  }, [patient.tutor, screens.xs, t]);

  const itemInfoTherapist: DescriptionsProps['items'] | null = useMemo(() => {
    if (!patient.therapist) {
      return null;
    }

    let items: DescriptionsProps['items'] = [];

    if (screens.xs) {
      items.push({
        key: '1',
        label: t('Patient.detail.card_profile.info_descriptions.email'),
        children: patient.therapist.fullName,
      });
    }

    items.push(
      {
        key: '1',
        label: t('Patient.detail.card_profile.info_descriptions.email'),
        children: patient.therapist.email,
      },
      {
        key: '2',
        label: t('Patient.detail.card_profile.info_descriptions.telephone'),
        children: patient.therapist.phoneNumber,
      },
    );

    return items;
  }, [patient.therapist, screens.xs, t]);

  const itemsTab: TabsProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: t('Patient.detail.tabs.record_tab'),
        icon: <BsPersonBadge size={20} />,
        children: (
          <RecordTab
            items={itemsGeneralInfo}
            patient={patient}
            itemInfoTutor={itemInfoTutor}
            itemInfoTherapist={itemInfoTherapist}
          />
        ),
      },
      {
        key: '2',
        label: t('Patient.detail.tabs.actividades_tab'),
        icon: <BsCardChecklist size={20} />,
        children: (
          <ActivityTab
            activities={patient.activities}
            currentActivity={patient.currentActivity}
          />
        ),
      },
      {
        key: '3',
        label: t('Patient.detail.tabs.pictogramas_tab'),
        icon: <BsImages size={20} />,
        children: <PictogramTab pictograms={patient.pictograms} />,
      },
      {
        key: '4',
        label: t('Patient.detail.tabs.logros_tab'),
        icon: <BsAward size={20} />,
        children: <AchievementTab patient={patient} />,
      },
    ],
    [itemInfoTherapist, itemInfoTutor, itemsGeneralInfo, patient, t],
  );

  return {
    itemsGeneralInfo,
    itemInfoTutor,
    itemInfoTherapist,
    itemsTab,
  };
};

export default useDataPatient;
