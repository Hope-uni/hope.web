import SkeletonGrid from '@/components/table/skeleton/SkeletonGrid';
import SkeletonTable from '@/components/table/skeleton/SkeletonTable';
import { useTableStore } from '@/lib/store/table';
import { Flex, Skeleton, Space } from 'antd';
import { TableProps } from 'antd/lib';
import { MODE_VIEW_DISPLAY } from '@/components/table/helpers';

const { Input, Button } = Skeleton;

interface Props {
  fetching?: boolean;
  columns?: TableProps<unknown>['columns'];
  selection?: any;
}

export default function WrapperSkeleton({
  fetching = false,
  columns,
  selection,
}: Props) {
  const { paginationTable, viewDisplay } = useTableStore();

  return (
    <Space
      id="table-skeleton"
      direction="vertical"
      size={20}
      style={{ marginTop: '20px', width: '100%' }}
    >
      {!fetching && (
        <Flex justify="space-between">
          <Input
            style={{
              width: '400px',
              height: '38px',
              borderRadius: '5px',
            }}
            active
            size="default"
          />
          <Button
            style={{
              marginTop: '8px',
              width: '200px',
              height: '38px',
              borderRadius: '5px',
            }}
            active
            size="default"
          />
        </Flex>
      )}
      {viewDisplay === MODE_VIEW_DISPLAY.TABLE && (
        <SkeletonTable
          size={paginationTable.size}
          colSpan={
            columns ? (selection ? columns.length + 1 : columns.length) : 1
          }
          columns={columns} //TODO This implementation needs improvement
        />
      )}
      {viewDisplay === MODE_VIEW_DISPLAY.GRID && <SkeletonGrid />}
      {fetching && (
        <Flex justify="flex-end">
          <Button
            style={{
              marginTop: '8px',
              width: '200px',
              height: '38px',
              borderRadius: '5px',
            }}
            active
            size="default"
            shape="square"
          />
        </Flex>
      )}
    </Space>
  );
}
