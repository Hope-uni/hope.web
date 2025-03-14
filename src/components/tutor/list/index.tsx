'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { useTutorColumns } from '@/components/tutor/list/TutorColumn';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { useFetchListTutorQuery } from '@/lib/queries/user';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function TutorIndex() {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const [columns] = useTutorColumns();
  const { searching, paginationTable, dispatch } = useTableStore();
  const { data, isLoading, isRefetching } = useFetchListTutorQuery({
    paginate: {
      page: paginationTable?.page,
      size: paginationTable?.size,
    },
  });

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
          data={data?.data}
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
