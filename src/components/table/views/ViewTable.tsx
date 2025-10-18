/* eslint-disable react-hooks/exhaustive-deps */
import { useTableStore } from '@/lib/store/table';
import { TablePropsType } from '@/models/types/Table.d';
import { Grid, Table } from 'antd';

const { useBreakpoint } = Grid;

function ViewTable({
  source,
  cols,
  id,
  scroll = false,
  showHeader,
  scrollHeight,
  stripped,
  onRowClick,
}: any) {
  const screens = useBreakpoint();

  const handleOnRow = (record: any, rowIndex: number | undefined) => {
    if (onRowClick) {
      return {
        onClick: () => onRowClick(record, rowIndex),
      };
    }
    return {};
  };

  return (
    <Table
      id={id}
      className={`customTable ${stripped && screens.sm ? 'table-stripped' : ''} ${onRowClick ? 'table-row-clickable' : ''}`}
      columns={cols}
      dataSource={source}
      scroll={
        screens.sm && scroll
          ? {
              x: 'max-content',
              y: scrollHeight ?? undefined,
            }
          : undefined
      }
      pagination={false}
      showHeader={showHeader}
      tableLayout="fixed"
      bordered={false}
      rowKey="id"
      rowHoverable={Boolean(onRowClick)}
      onRow={handleOnRow}
    />
  );
}

export default ViewTable;
