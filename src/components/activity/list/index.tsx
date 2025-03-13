'use client';

import { useActivityColumns } from '@/components/activity/list/ActivityColumn';
import WrapperTable from '@/components/table/Wrappertable';
import { useFetchListActivitiesQuery } from '@/lib/queries/activity';
import { useFetchListPhasesQuery } from '@/lib/queries/pecs';
import { useFetchListPictogramsQuery } from '@/lib/queries/pictogram';
import { useFormActivityStore } from '@/lib/store/forms/formActivity';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { message, Space } from 'antd';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function PatientIndex() {
  const { t } = useTranslation();
  const { setPhaseList, setPictogramList } = useFormActivityStore();
  const [columns] = useActivityColumns();
  const { searching, paginationTable, dispatch } = useTableStore();

  const queryPhase = useFetchListPhasesQuery();
  const queryPictogram = useFetchListPictogramsQuery();
  const { data, isLoading, isRefetching } = useFetchListActivitiesQuery({
    paginate: {
      page: paginationTable?.page,
      size: paginationTable?.size,
    },
  });

  const loading = useMemo(
    () => !(!isLoading && !queryPhase.isLoading && !queryPictogram.isLoading),
    [isLoading, queryPhase.isLoading, queryPictogram.isLoading],
  );

  useEffect(() => {
    if (!loading) {
      if (queryPhase?.data) {
        setPhaseList(queryPhase?.data.data || []);
      }

      if (queryPictogram?.data && queryPictogram?.data?.data) {
        setPictogramList(queryPictogram?.data.data || []);
      }
    }
  }, [
    loading,
    queryPhase?.data,
    queryPictogram?.data,
    setPhaseList,
    setPictogramList,
  ]);

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    message.success('Processing complete!'); // TODO it's will change for message returned by api
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          cols={columns}
          data={data}
          searchable
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Activity.index.searchPlaceholder'),
          }}
          loading={loading}
          fetching={isRefetching}
        />
      </Space>
    </>
  );
}
