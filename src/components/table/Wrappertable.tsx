import SkeletonTable from '@/components/table/SkeletonTable';
import {
  Flex,
  Pagination,
  Select,
  Space,
  Table,
  TableProps,
  Typography,
} from 'antd';
import SearchTable from './searchTable/SearchTable';
import { TablePropsType } from '@/models/types/Table.d';
import { useEffect, useState } from 'react';
import { HopeTable } from '@/constants/config';

const { Text } = Typography;

function WrapperTable({
  btnExtra = false,
  customPagination = true,
  pageSize,
  typeSelection = 'radio',
  selection,
  cols,
  data = [],
  showHeader = true,
  searchable = false,
  stylesWrap,
  id,
  loading,
  scroll = false,
  scrollHeight,
  searchProps,
}: TablePropsType) {
  const [pagination, setPagination] = useState<any>();
  const [showTotal, setShowTotal] = useState<string>();

  useEffect(() => {
    setPagination({
      showSizeChanger: false,
      pageSize: pageSize ?? '5',
      total: data?.length,
    });
  }, [data?.length, pageSize]);

  const handleSizeChanger = (value: any) => {
    setPagination({
      ...pagination,
      pageSize: value,
    });
  };

  const headerTable = () => {
    return (
      <Flex
        className="wrapper-header-table"
        justify="space-between"
        align="flex-end"
      >
        {searchable && searchProps && <SearchTable {...searchProps} />}
        <Flex align="center" gap={20}>
          <Text>{showTotal}</Text>
          <Select
            className="select-size-changer"
            value={pagination?.pageSize}
            onChange={handleSizeChanger}
            options={HopeTable.sizeChangerOptions}
          />
        </Flex>
      </Flex>
    );
  };

  const handleShowTotal = (total: number, range: [number, number]) => {
    setShowTotal(`${range[0]}-${range[1]} de ${total} elementos`);
    return undefined;
  };

  return (
    <div style={{ ...stylesWrap }}>
      <Table
        id={id}
        components={{
          body: {
            wrapper: loading
              ? () => {
                  return (
                    <SkeletonTable
                      size={10}
                      colSpan={
                        cols ? (selection ? cols.length + 1 : cols.length) : 1
                      }
                    />
                  );
                }
              : undefined,
          },
        }}
        columns={cols}
        dataSource={data}
        scroll={
          scroll
            ? {
                x: 'max-content',
                y: scrollHeight ?? undefined,
              }
            : undefined
        }
        pagination={{
          showSizeChanger: false,
          pageSize: pagination?.pageSize,
          total: data?.length,
          showTotal: handleShowTotal,
        }}
        showHeader={showHeader}
        tableLayout="fixed"
        title={() => headerTable()}
        bordered={false}
      />
    </div>
  );
}

export default WrapperTable;
