'use client';

import ActivityDetail from '@/components/activity/detail';
import HModal from '@/components/common/Modals';
import { useFetchFindActivityByIdQuery } from '@/lib/queries/activity';
import { useOverlayStore } from '@/lib/store';
import { Result } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SlotTestPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [openDetail, setOpenDetail] = useState(false);
  const { setLoading } = useOverlayStore();
  const { data, isLoading } = useFetchFindActivityByIdQuery(Number(params.id));

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
      setOpenDetail(true);
    }
  }, [data?.data, isLoading, setLoading]);

  return (
    <HModal
      open={openDetail}
      onClose={() => router.back()}
      width={800}
      title={t('Activity.actions.detail.modal.title')}
      footer={null}
    >
      {data?.data ? (
        <ActivityDetail activity={data.data} />
      ) : (
        <Result
          status="404"
          title="404"
          subTitle={t('Activity.form.feedback.activity_not_found')}
        />
      )}
    </HModal>
  );
}
