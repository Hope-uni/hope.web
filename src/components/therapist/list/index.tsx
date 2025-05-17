'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { useTherapistColumns } from '@/components/therapist/list/TherapistColumn';
import { RoutesName } from '@/constants';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { useFetchListTherapistQuery } from '@/lib/queries/user';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function TherapistIndex() {
  const { t } = useTranslation();
  const router = useRouter();
  const { openNotification } = useOpenNotification();
  const [columns] = useTherapistColumns();
  const { searching, paginationTable, dispatch } = useTableStore();
  const { data, isLoading, isRefetching } = useFetchListTherapistQuery({
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
    router.push(`${RoutesName.therapist.index}/${record?.id}`, {
      scroll: false,
    });
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          id="therapist-table"
          cols={columns}
          data={data}
          searchable={false}
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Therapist.index.searchPlaceholder'),
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
