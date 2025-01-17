'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { useTutorColumns } from '@/components/tutor/list/TutorColumn';
import { useTable } from '@/context/Table/TableContext';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { getTutorList } from '../../../../__mocks__/user';

export default function TutorIndex() {
  const { t } = useTranslation();
  const [columns] = useTutorColumns();
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
          data={getTutorList.data}
          searchable
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Tutor.index.searchPlaceholder'),
          }}
        />
      </Space>
    </>
  );
}
