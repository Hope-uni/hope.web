import React from 'react';
import { Flex, Skeleton, Space } from 'antd';

const { Input, Button, Avatar } = Skeleton;

export default function SkeletonFormEditUser() {
  return (
    <Space
      direction="vertical"
      size={30}
      style={{ marginTop: '20px', width: '100%', maxWidth: '900px' }}
    >
      <Flex align="center" gap={20}>
        <Avatar shape="circle" size={80} active style={{ flexShrink: 0 }} />
        <Input
          style={{
            height: '120px',
            borderRadius: '8px',
          }}
          active
          block
        />
      </Flex>
      <Space
        direction="vertical"
        size={20}
        style={{ marginTop: '20px', width: '100%' }}
      >
        <Input style={{ height: '28px', width: '150px' }} active block />
        <Flex gap={20}>
          <Input style={{ height: '38px', borderRadius: '5px' }} active block />
          <Input style={{ height: '38px', borderRadius: '5px' }} active block />
        </Flex>
      </Space>
      <Space
        direction="vertical"
        size={20}
        style={{ marginTop: '20px', width: '100%' }}
      >
        <Input style={{ height: '28px', width: '150px' }} active block />
        <Flex gap={20} style={{ marginBottom: 0 }}>
          <Input style={{ height: '38px', borderRadius: '5px' }} active block />
          <Input style={{ height: '38px', borderRadius: '5px' }} active block />
        </Flex>
        <Input style={{ height: '38px' }} active block />
        <Input style={{ height: '80px' }} active block />
      </Space>
      <Space
        direction="vertical"
        size={20}
        style={{ marginTop: '20px', width: '100%' }}
      >
        <Input style={{ height: '28px', width: '150px' }} active block />
        <Input style={{ height: '88px' }} active block />
        <Flex gap={20}>
          <Input style={{ height: '38px' }} active block /> {/* Fecha */}
          <Input style={{ height: '38px' }} active block /> {/* ID */}
          <Input style={{ height: '38px' }} active block /> {/* Celular */}
        </Flex>
      </Space>

      <Flex justify="end" gap={10}>
        <Button
          style={{
            width: '120px',
            height: '38px',
            borderRadius: '5px',
          }}
          active
          shape="round"
        />
        <Button
          style={{
            width: '120px',
            height: '38px',
            borderRadius: '5px',
          }}
          active
          shape="round"
        />
      </Flex>
    </Space>
  );
}
