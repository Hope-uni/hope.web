'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { Space, message } from 'antd';
import { getTutorList } from '../../../../__mocks__/user';
import { useTutorColumns } from './TutorColumn';
import { useTable } from '@/context/Table/TableContext';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { useTranslations } from 'next-intl';

export default function TutorIndex() {
  const t = useTranslations('_.Tutor');
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
            placeholder: t('index.searchPlaceholder'),
          }}
        />
      </Space>
    </>
  );
}
