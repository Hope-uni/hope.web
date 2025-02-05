import React, { useMemo } from 'react';
import { Flex, Skeleton, Space, Table } from 'antd';
import { useUserColumns } from '../user/list/UserColumn';

const { Input, Button } = Skeleton;

interface Props {
  size?: number;
  colSpan: number;
  fetching?: boolean;
}

export default function SkeletonTable({
  size = 10,
  colSpan,
  fetching = false,
}: Props) {
  const [columns] = useUserColumns();

  console.log(fetching, 'fetching');

  const rows = useMemo(() => (size <= 10 ? size : 10), [size]);

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
      <Table
        components={{
          body: {
            wrapper: () => {
              return (
                <tbody>
                  {Array.from(Array(rows).keys()).map((item) => (
                    <tr key={item}>
                      <td colSpan={colSpan}>
                        <Input
                          style={{
                            marginTop: '8px',
                            height: '53px',
                            borderRadius: '5px',
                          }}
                          active
                          size="default"
                          block
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              );
            },
          },
        }}
        columns={columns}
      />
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
