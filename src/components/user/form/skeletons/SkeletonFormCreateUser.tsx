import React, { useMemo } from 'react';
import { Flex, Skeleton, Space, Table } from 'antd';

const { Input, Button, Avatar } = Skeleton;

export default function SkeletonFormCreateUser() {
  return (
    <Space
      id="table-skeleton"
      direction="vertical"
      size={20}
      style={{ marginTop: '20px', width: '100%' }}
    >
      <Flex gap={50}>
        <Flex vertical flex={1} gap={80}>
          <Flex gap={18} align="center">
            <Avatar active size="large" shape="circle" />
            <Input active size="default" block />
          </Flex>
          <Flex gap={18} align="center">
            <Avatar active size="large" shape="circle" />
            <Input active size="default" block />
          </Flex>
          <Flex gap={18} align="center">
            <Avatar active size="large" shape="circle" />
            <Input active size="default" block />
          </Flex>
        </Flex>
        <Flex vertical flex={3} gap={40}>
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
          <Input
            style={{
              marginTop: '8px',
              height: '38px',
              borderRadius: '5px',
            }}
            active
            size="small"
            block
          />
          <Input
            style={{
              marginTop: '8px',
              height: '38px',
              borderRadius: '5px',
            }}
            active
            size="small"
            block
          />
          <Input
            style={{
              marginTop: '8px',
              height: '38px',
              borderRadius: '5px',
            }}
            active
            size="small"
            block
          />
          <Input
            style={{
              marginTop: '8px',
              height: '38px',
              borderRadius: '5px',
            }}
            active
            size="small"
            block
          />
        </Flex>
      </Flex>
      <Flex justify="end">
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
    </Space>
  );
}
