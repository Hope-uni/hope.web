'use client';

import GoToBack from '@/components/GoToBack';
import useDetailTutor from '@/components/tutor/detail/useDetailTutor';
import TutorActions from '@/components/tutor/list/TutorActions';
import CardProfile from '@/components/user/detail/CardProfile';
import {
  DetailTutor,
  SingleTutorTherapistSchema,
  UserProfileCardSchema,
} from '@/models/schema';
import styles from '@/styles/modules/tutor.module.scss';
import { Button, Flex, Grid, Tabs } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const { useBreakpoint } = Grid;

interface Props {
  tutor: DetailTutor;
}

export default function TutorDetail({ tutor }: Props) {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const { itemsTab } = useDetailTutor(tutor);

  return (
    <>
      <Flex
        vertical
        justify="flex-start"
        gap={30}
        className={styles.wrapper_detail}
      >
        <Flex justify="space-between" align="center">
          <GoToBack />
          <Flex gap={10} align="center">
            {screens.xs && (
              <TutorActions
                tutor={SingleTutorTherapistSchema.parse(tutor)}
                actions={['edit', 'delete']}
                classWrapper="popup_actions_primary_vertical"
              />
            )}
            {screens.sm && (
              <Flex gap={10}>
                <Link href={`/admin/users/edit/${tutor.userId}`}>
                  <Button type="default">{t('Actions.edit')}</Button>
                </Link>
                <TutorActions
                  tutor={SingleTutorTherapistSchema.parse(tutor)}
                  renderMode="delete"
                />
              </Flex>
            )}
          </Flex>
        </Flex>

        <CardProfile user={UserProfileCardSchema.parse(tutor)} showUser />

        <Tabs className="record-tab" defaultActiveKey="1" items={itemsTab} />
      </Flex>
    </>
  );
}
