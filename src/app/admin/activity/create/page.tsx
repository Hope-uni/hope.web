'use client';

import ActivityForm from '@/components/activity/form';
import GoToBack from '@/components/GoToBack';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import { useFetchListPhasesQuery } from '@/lib/queries/pecs';
import {
  useFetchListCategoryPictogramsQuery,
  useFetchListPictogramsQuery,
} from '@/lib/queries/pictogram';
import { useFormActivityStore } from '@/lib/store/forms/formActivity';
import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin } from 'antd';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function CreatePatientPage() {
  const { t } = useTranslation();
  const {
    setPhaseList,
    setPictogramList,
    setCategoryPictogramList,
    setIsRefetchingPictograms,
    filters,
  } = useFormActivityStore();
  const queryPhase = useFetchListPhasesQuery();
  const queryCategory = useFetchListCategoryPictogramsQuery();
  const queryPictogram = useFetchListPictogramsQuery(undefined, filters);

  const loading = useMemo(
    () =>
      !(
        !queryPhase.isLoading &&
        !queryCategory.isLoading &&
        !queryPictogram.isLoading
      ),
    [queryCategory.isLoading, queryPhase.isLoading, queryPictogram.isLoading],
  );

  useEffect(() => {
    setIsRefetchingPictograms(queryPictogram.isRefetching);
  }, [queryPictogram.isRefetching, setIsRefetchingPictograms]);

  useEffect(() => {
    if (!loading) {
      if (queryPhase?.data) {
        setPhaseList(queryPhase?.data.data || []);
      }

      if (queryPictogram?.data && queryPictogram?.data?.data) {
        setPictogramList(queryPictogram?.data.data || []);
      }

      if (queryCategory?.data && queryCategory?.data?.data) {
        setCategoryPictogramList(queryCategory?.data.data || []);
      }
    }
  }, [
    loading,
    queryCategory?.data,
    queryPhase?.data,
    queryPictogram?.data,
    setCategoryPictogramList,
    setPhaseList,
    setPictogramList,
  ]);

  return (
    <>
      {!loading ? (
        <>
          <Space direction="vertical" size={10}>
            <GoToBack />
            <HeaderContent
              title={t('User.form.create.title')}
              caption={t('User.form.create.caption')}
            />
            <ActivityForm />
          </Space>
        </>
      ) : (
        <Spin fullscreen indicator={<LoadingOutlined spin />} size="large" />
      )}
    </>
  );
}
