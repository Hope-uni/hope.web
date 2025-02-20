'use client';

import GoToBack from '@/components/GoToBack';
import useDetailTherapist from '@/components/therapist/detail/useDetailTherapist';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import CardProfile from '@/components/user/detail/CardProfile';
import {
  CreateTherapistResponse,
  ListTherapistResponseSchema,
  UserProfileCardSchema,
} from '@/models/schema';
import styles from '@/styles/modules/therapist.module.scss';
import { Button, Flex, Grid, Tabs } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const { useBreakpoint } = Grid;

interface Props {
  therapist: CreateTherapistResponse;
}

export default function TherapistDetail({ therapist }: Props) {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const { itemsTab } = useDetailTherapist(therapist);

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
            {screens.xs && (
              <TherapistActions
                therapist={ListTherapistResponseSchema.parse(therapist)}
                actions={['edit', 'delete', 'assign_patient']}
                classWrapper="popup_actions_primary_vertical"
              />
            )}
            {screens.sm && (
              <Flex gap={10}>
                <Link href={`/admin/users/edit/${therapist.userId}`}>
                  <Button type="default">{t('Actions.edit')}</Button>
                </Link>
                <TherapistActions
                  therapist={ListTherapistResponseSchema.parse(therapist)}
                  renderMode="assign_patient"
                />
                <TherapistActions
                  therapist={ListTherapistResponseSchema.parse(therapist)}
                  renderMode="delete"
                />
              </Flex>
            )}
          </Flex>
        </Flex>

        <CardProfile user={UserProfileCardSchema.parse(therapist)} showUser />

        <Tabs className="record-tab" defaultActiveKey="1" items={itemsTab} />
      </Flex>
    </>
  );
}
