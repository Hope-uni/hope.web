import { E_ActionKeyTable, SearchPropsType } from '@/models/types';
import { Flex, Select, Typography } from 'antd';
import SearchTable from './searchTable/SearchTable';
import { useCallback } from 'react';
import { HopeTable } from '@/constants';
import { useTableStore } from '@/lib/store/table';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface HeaderTableProps {
  searchProps?: SearchPropsType;
  searchable?: boolean;
}

const HeaderTable = ({ searchable = false, searchProps }: HeaderTableProps) => {
  const { t } = useTranslation();
  const { paginationTable, dispatch } = useTableStore();

  const handleSizeChanger = useCallback(
    (value: string) => {
      if (paginationTable.size !== Number(value)) {
        dispatch({
          type: E_ActionKeyTable.SET_PAGINATION,
          payload: {
            ...paginationTable,
            page: 1,
            size: Number(value),
          },
        });
      }
    },
    [paginationTable, dispatch],
  );

  return (
    <Flex
      className="wrapper-header-table"
      justify={searchable && searchProps ? 'space-between' : 'flex-end'}
      align="flex-end"
    >
      {searchable && searchProps && <SearchTable {...searchProps} />}
      <Flex align="center" gap={20}>
        <Text>
          {t('components.table.single_results', {
            total: paginationTable.totalData,
          })}
        </Text>
        <Select
          className="select-size-changer"
          value={paginationTable?.size?.toString()}
          onChange={handleSizeChanger}
          options={HopeTable.sizeChangerOptions}
        />
      </Flex>
    </Flex>
  );
};

export default HeaderTable;
