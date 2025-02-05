'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { useUserColumns } from '@/components/user/list/UserColumn';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFetchListUserQuery } from '@/lib/queries/user';
import { useTableStore } from '@/lib/store/table';

export default function UserIndex() {
  const { t } = useTranslation();
  const [columns] = useUserColumns();
  const { searching, paginationTable, dispatch } = useTableStore();
  const { data, isLoading, isRefetching } = useFetchListUserQuery({
    paginate: {
      page: paginationTable?.page,
      size: paginationTable?.size,
    },
  });

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    message.success('Processing complete!'); // TODO it's will change for message returned by api
  };

  return (
    <>
      <Space direction="vertical" size={10} style={{ width: '100%' }}>
        <WrapperTable
          cols={columns}
          data={data}
          searchable
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('User.index.searchPlaceholder'),
          }}
          loading={isLoading}
          fetching={isRefetching}
        />
      </Space>
    </>
  );
}
