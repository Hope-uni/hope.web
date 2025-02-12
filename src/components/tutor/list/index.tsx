'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { useTutorColumns } from '@/components/tutor/list/TutorColumn';
import { useFetchListTutorQuery } from '@/lib/queries/user';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { removeKeysFromObject } from '@/utils/objects';
import { message, Space } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function TutorIndex() {
  const { t } = useTranslation();
  const [columns] = useTutorColumns();
  const { searching, paginationTable, dispatch } = useTableStore();
  const { data, isLoading, isRefetching } = useFetchListTutorQuery({
    paginate: {
      page: paginationTable?.page,
      size: paginationTable?.size,
    },
  });

  const dataMapped = useMemo(() => {
    if (!data?.data) {
      return data;
    }

    const newDataWithOutChildren = data.data.map((item) =>
      removeKeysFromObject(
        {
          ...item,
          patientsInCharge: item?.children?.length || 0,
        },
        ['children'],
      ),
    );

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
            placeholder: t('Tutor.index.searchPlaceholder'),
          }}
          loading={isLoading}
          fetching={isRefetching}
        />
      </Space>
    </>
  );
}
