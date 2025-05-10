'use client';

import UserVerificationAlert from '@/components/common/Alerts/UserNotVerifiedAlert';
import GoToBack from '@/components/GoToBack';
import { RENDER_MODE_ACTION } from '@/components/table/helpers';
import useDetailTherapist from '@/components/therapist/detail/useDetailTherapist';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import CardProfile from '@/components/user/detail/CardProfile';
import { ROLES_KEYS } from '@/constants/guards';
import {
  DetailTherapist,
  SingleTutorTherapistSchema,
  UserProfileCardSchema,
} from '@/models/schema';
import styles from '@/styles/modules/therapist.module.scss';
import { Button, Flex, Grid, Tabs } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const { useBreakpoint } = Grid;

interface Props {
  therapist: DetailTherapist;
}

export default function TherapistDetail({ therapist }: Props) {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const { itemsTab } = useDetailTherapist(therapist);

  return (
    <>
      <UserVerificationAlert isVerified={therapist.isVerified} />
      <Flex
        vertical
        justify="flex-start"
        gap={30}
        className={styles.wrapper_detail}
      >
        <Flex justify="space-between" align="flex-start">
          <GoToBack />
          <Flex gap={10} align="center">
            {screens.xs && (
              <TherapistActions
                therapist={SingleTutorTherapistSchema.parse(therapist)}
                actions={['edit', 'delete', 'assign_patient']}
                classWrapper="popup_actions_primary_vertical"
              />
            )}
            {screens.sm && (
              <Flex gap={10}>
                <Link href={`/admin/users/edit/${therapist.userId}`}>
                  <Button type="default" disabled={!therapist.isVerified}>
                    {t('Actions.edit')}
                  </Button>
                </Link>
                <TherapistActions
                  therapist={SingleTutorTherapistSchema.parse(therapist)}
                  renderMode={RENDER_MODE_ACTION.ASSIGN_PATIENT}
                />
                <TherapistActions
                  therapist={SingleTutorTherapistSchema.parse(therapist)}
                  renderMode={RENDER_MODE_ACTION.DELETE}
                />
              </Flex>
            )}
          </Flex>
        </Flex>

        <CardProfile
          user={UserProfileCardSchema.parse(therapist)}
          showUser
          roleName={ROLES_KEYS.THERAPIST}
        />

        <Tabs className="record-tab" defaultActiveKey="1" items={itemsTab} />
      </Flex>
    </>
  );
}
