'use client';
import { IMAGE_PLACEHOLDER } from '@/constants/OptimizedImage';
import { UserSession } from '@/models/types/auth';
import styles from '@/styles/modules/layouts.module.scss';
import { getCurrentUser } from '@/utils/session';
import { Flex, Typography } from 'antd';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import OptimizedImage from '@/components/common/OptimizedImage';

export default function AvatarProfile() {
  const { data: session } = useSession();

  const currentUser = useMemo(
    () => getCurrentUser(session?.user as UserSession),
    [session],
  );

  if (!session?.expires) return null;

  return (
    <Flex
      align="center"
      justify="space-between"
      gap="10px"
      className={styles.avatar}
    >
      <OptimizedImage
        srcImage={currentUser.image}
        size="50px"
        shape="circle"
        placeholderImage={IMAGE_PLACEHOLDER.USER}
        mobileResponsive={{ width: '40px', height: '40px' }}
      />
      <Flex vertical>
        <Typography.Title level={3} className={styles.full_name}>
          {currentUser.fullName}
        </Typography.Title>
        <Typography.Text className={styles.role}>
          {currentUser.role.name}
        </Typography.Text>
      </Flex>
    </Flex>
  );
}
