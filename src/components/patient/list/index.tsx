'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { useFetchListPatientQuery } from '@/lib/queries/user';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { usePatientColumns } from './PatientColumn';
import { useRouter } from 'next/navigation';
import { RoutesName } from '@/constants';

export default function PatientIndex() {
  const { t } = useTranslation();
  const router = useRouter();
  const { openNotification } = useOpenNotification();
  const [columns] = usePatientColumns();
  const { searching, paginationTable, dispatch } = useTableStore();
  const { data, isLoading, isRefetching } = useFetchListPatientQuery({
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
    router.push(`${RoutesName.patient.index}/${record?.id}`, {
      scroll: false,
    });
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          id="patient-table"
          cols={columns}
          data={data}
          searchable={false}
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Patient.index.searchPlaceholder'),
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
