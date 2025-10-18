import { Skeleton, Space, Table } from 'antd';
import { TableProps } from 'antd/lib';
import { useMemo } from 'react';

const { Input } = Skeleton;

interface Props {
  size?: number;
  colSpan: number;
  fetching?: boolean;
  columns?: TableProps<unknown>['columns'];
}

export default function SkeletonTable({ size = 10, colSpan, columns }: Props) {
  const rows = useMemo(() => (size <= 10 ? size : 10), [size]);

  return (
    <Space
      id="table-skeleton"
      direction="vertical"
      size={20}
      style={{ marginTop: '20px', width: '100%' }}
    >
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
    </Space>
  );
}
