'use client';

import { useActivityColumns } from '@/components/activity/list/ActivityColumn';
import WrapperTable from '@/components/table/Wrappertable';
import { useTable } from '@/context/Table/TableContext';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { getActivitiesList } from '../../../../__mocks__/user';

export default function PatientIndex() {
  const { t } = useTranslation();
  const [columns] = useActivityColumns();
  const {
    state: { searching },
    dispatch,
  } = useTable();

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
  };

  return (
    <>
      <Space direction="vertical" size={10}>
        <WrapperTable
          cols={columns}
          data={getActivitiesList.data}
          searchable
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Activity.index.searchPlaceholder'),
          }}
        />
      </Space>
    </>
  );
}
