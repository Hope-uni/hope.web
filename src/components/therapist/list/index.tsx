'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { useTherapistColumns } from '@/components/therapist/list/TherapistColumn';
import { useFetchListTherapistQuery } from '@/lib/queries/user';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { message, Space } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function TherapistIndex() {
  const { t } = useTranslation();
  const [columns] = useTherapistColumns();
  const { searching, paginationTable, dispatch } = useTableStore();
  const { data, isLoading, isRefetching } = useFetchListTherapistQuery({
    paginate: {
      page: paginationTable?.page,
      size: paginationTable?.size,
    },
  });

  const dataMapped = useMemo(() => {
    if (!data?.data) {
      return data;
    }

    const newDataWithOutChildren = data.data.map((item) => ({
      ...item,
      patientsInCharge: item?.patients?.length || 0,
    }));

    return {
      ...data,
      data: newDataWithOutChildren,
    };
  }, [data]);

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    message.success('Processing complete!'); // TODO it's will change for message returned by api
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          cols={columns}
          data={dataMapped}
          searchable
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Therapist.index.searchPlaceholder'),
          }}
          loading={isLoading}
          fetching={isRefetching}
        />
      </Space>
    </>
  );
}
