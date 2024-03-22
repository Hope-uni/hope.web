'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import styles from '@/styles/modules/layouts.module.scss';
import { colorList } from '@/constants/Avatar';

export default function AvatarProfile() {
  const user = {
    fullName: 'Samuel Barberena',
    role: 'admin',
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      gap="10px"
      className={styles.avatar}
    >
      <Avatar
        className={styles.image}
        style={{
          backgroundColor: colorList[user.fullName.charAt(0).toLowerCase()],
          verticalAlign: 'middle',
        }}
      >
        {user.fullName.charAt(0)}
      </Avatar>
      <Flex vertical>
        <Typography.Title level={3} className={styles.full_name}>
          {user.fullName}
        </Typography.Title>
        <Typography.Text className={styles.role}>{user.role}</Typography.Text>
      </Flex>
    </Flex>
  );
}
