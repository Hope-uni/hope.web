'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { Space } from 'antd';
import { getTherapistList } from '../../../../__mocks__/user';
import { useTherapistColumns } from '@/components/therapist/list/TherapistColumn';
import { useTable } from '@/context/Table/TableContext';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { useTranslations } from 'next-intl';

export default function TherapistIndex() {
  const t = useTranslations('_.Therapist');
  const [columns] = useTherapistColumns();
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
          data={getTherapistList.data}
          searchable
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('index.searchPlaceholder'),
          }}
        />
      </Space>
    </>
  );
}
