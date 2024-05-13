'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { Space, message } from 'antd';
import { getUserList } from '../../../../__mocks__/user';
import { useUserColumns } from './UserColumn';
import { useTable } from '@/context/Table/TableContext';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { useTranslations } from 'next-intl';

export default function UserIndex() {
  const t = useTranslations('_.User');
  const [columns] = useUserColumns();
  const {
    state: { searching },
    dispatch,
  } = useTable();

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    message.success('Processing complete!'); // TODO it's will change for message returned by api
  };

  return (
    <>
      <Space direction="vertical" size={10}>
        <WrapperTable
          cols={columns}
          data={getUserList.data}
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
