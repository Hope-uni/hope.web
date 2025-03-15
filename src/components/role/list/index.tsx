'use client';

import { useRoleColumns } from '@/components/role/list/RoleColumn';
import WrapperTable from '@/components/table/Wrappertable';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { useFetchListRoleQuery } from '@/lib/queries/role';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function RoleIndex() {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const [columns] = useRoleColumns();
  const { searching, dispatch } = useTableStore();
  const { data, isLoading, isRefetching } = useFetchListRoleQuery();

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    openNotification.success({
      description: 'Processing complete!',
    }); // TODO it's will change for message returned by api
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          cols={columns}
          data={data}
          searchable={false}
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Role.index.searchPlaceholder'),
          }}
          loading={isLoading}
          fetching={isRefetching}
          pagination={false}
        />
      </Space>
    </>
  );
}
