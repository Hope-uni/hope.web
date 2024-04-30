import React from 'react';
import { Skeleton } from 'antd';

const { Input } = Skeleton;

interface Props {
  size?: number;
  colSpan: number;
}

export default function SkeletonTable({ size = 10, colSpan }: Props) {
  return (
    <tbody>
      {Array.from(Array(size).keys()).map((item) => (
        <tr key={item}>
          <td colSpan={colSpan}>
            <Input
              style={{
                marginBottom: '2px',
                height: '44px',
                borderRadius: '5px',
              }}
              active={true}
              size="default"
              block={true}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
