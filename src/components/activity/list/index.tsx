'use client';

import { useActivityColumns } from '@/components/activity/list/ActivityColumn';
import WrapperTable from '@/components/table/Wrappertable';
import { RoutesName } from '@/constants';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { useFetchListActivitiesQuery } from '@/lib/queries/activity';
import { useOverlayStore } from '@/lib/store';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { useQueryClient } from '@tanstack/react-query';
import { Space } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function PatientIndex() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openNotification } = useOpenNotification();
  const [columns] = useActivityColumns();
  const { searching, paginationTable, dispatch } = useTableStore();
  const { setLoading } = useOverlayStore();

  const { data, isLoading, isRefetching } = useFetchListActivitiesQuery({
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

  const handleOnRowClick = (record: any, rowIndex: number | undefined) => {
    const cachedData = queryClient.getQueryData([
      'find-activity-by-id',
      record?.id,
    ]);

    if (!cachedData) {
      setLoading(true);
    }

    router.push(`${RoutesName.activity.index}/${record?.id}`, {
      scroll: false,
    });
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          id="activity-table"
          cols={columns}
          data={data}
          searchable={false}
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Activity.index.searchPlaceholder'),
          }}
          loading={isLoading}
          fetching={isRefetching}
          scroll
          onRowClick={handleOnRowClick}
        />
      </Space>
    </>
  );
}
