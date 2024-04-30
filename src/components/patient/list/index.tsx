'use client';

import WrapperTable from '@/components/table/Wrappertable';
import { Space, message } from 'antd';
import { getPatientList } from '../../../../__mocks__/user';
import { usePatientColumns } from './PatientColumn';
import { useTable } from '@/context/Table/TableContext';
import { E_ActionKeyTable } from '@/models/types/Table.d';

export default function PatientIndex() {
  const [columns] = usePatientColumns();
  const {
    state: { searching },
    dispatch,
  } = useTable();

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    message.success('Processing complete!');
  };

  return (
    <>
      <Space direction="vertical" size={10}>
        <WrapperTable
          cols={columns}
          data={getPatientList.data}
          searchable
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: 'Buscar paciente...', //TODO luego se le aplicará internacionalización
          }}
        />
      </Space>
    </>
  );
}
