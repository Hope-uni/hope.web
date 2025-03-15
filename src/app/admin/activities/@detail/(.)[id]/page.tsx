'use client';

import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { useFetchFindActivityByIdQuery } from '@/lib/queries/activity';
import { useOverlayStore } from '@/lib/store';
import { Result } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ActivityDetail from '@/components/activity/detail';
import { useRouter } from 'next/navigation';

export default function SlotTestPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [openDetail, setOpenDetail] = useState(false);
  const [activityNotFound, setActivityNotFound] = useState(false);
  const { setLoading } = useOverlayStore();
  const { data, isLoading } = useFetchFindActivityByIdQuery(Number(params.id));

  useEffect(() => {
    if (!isLoading) {
      if (!data?.data) {
        setActivityNotFound(true);
      }
      setLoading(false);
      setOpenDetail(true);
    }
  }, [data?.data, isLoading, setLoading]);

  return (
    <HModal
      open={openDetail}
      onClose={() => {
        router.replace('/admin/activities');
        setOpenDetail(false);
      }}
      width={800}
      title={t('Activity.actions.detail.modal.title')}
      footer={null}
    >
      <Show>
        <Show.When isTrue={!activityNotFound}>
          <ActivityDetail activity={data?.data!} />
        </Show.When>
        <Show.Else>
          <Result
            status="404"
            title="404"
            subTitle={t('Activity.form.feedback.activity_not_found')}
          />
        </Show.Else>
      </Show>
    </HModal>
  );
}
