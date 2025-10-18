import { MODE_VIEW_DISPLAY } from '@/components/table/helpers';
import { HopeTable } from '@/constants';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable, SearchPropsType } from '@/models/types';
import { Flex, Grid, Segmented, Select, Typography } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillGridFill, BsTable } from 'react-icons/bs';
import SearchTable from './searchTable/SearchTable';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface HeaderTableProps {
  searchProps?: SearchPropsType;
  searchable?: boolean;
  showSizeChanger?: boolean;
  showViewToggle?: boolean;
}

const HeaderTable = ({
  searchable = false,
  showSizeChanger = true,
  showViewToggle = true,
  searchProps,
}: HeaderTableProps) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const { paginationTable, dispatch, viewDisplay } = useTableStore();

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

  const handleViewToggle = useCallback(
    (value: string) => {
      dispatch({
        type: E_ActionKeyTable.SET_VIEW_DISPLAY,
        payload: value,
      });
    },
    [dispatch],
  );

  return (
    <Flex
      className="wrapper-header-table"
      justify={searchable && searchProps ? 'space-between' : 'flex-end'}
      align="flex-start"
    >
      {searchable && searchProps && <SearchTable {...searchProps} />}
      <Flex
        vertical
        align="flex-end"
        gap={20}
        style={{
          width: screens.sm ? 'auto' : '100%',
        }}
      >
        <Flex
          justify={searchable && searchProps ? 'space-between' : 'flex-end'}
          gap={20}
          style={{
            width: screens.sm ? 'auto' : '100%',
          }}
        >
          {showSizeChanger && (
            <Select
              className="select-size-changer"
              value={paginationTable?.size?.toString()}
              onChange={handleSizeChanger}
              options={HopeTable.sizeChangerOptions}
            />
          )}
          {showViewToggle && (
            <Segmented
              value={viewDisplay}
              onChange={handleViewToggle}
              className="segmented-primary"
              options={[
                { value: MODE_VIEW_DISPLAY.TABLE, icon: <BsTable /> },
                { value: MODE_VIEW_DISPLAY.GRID, icon: <BsFillGridFill /> },
              ]}
            />
          )}
        </Flex>
        <Flex align="center" gap={10}>
          <Text>
            {t('components.table.single_results', {
              total: paginationTable.totalData,
            })}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeaderTable;
