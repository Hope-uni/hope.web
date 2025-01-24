'use client';
import { colorList } from '@/constants/Avatar';
import { UserSession } from '@/models/types/auth';
import styles from '@/styles/modules/layouts.module.scss';
import { getCurrentUser } from '@/utils/session';
import { Avatar, Flex, Typography } from 'antd';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

interface AvatarFallbackProps {
  fullName: string;
}

const AvatarFallback = ({ fullName }: AvatarFallbackProps) => {
  const backgroundColor = colorList[fullName.charAt(0).toLowerCase()] || '#ccc';

  return (
    <Avatar
      className={styles.image}
      style={{ backgroundColor, verticalAlign: 'middle' }}
    >
      {fullName.charAt(0)}
    </Avatar>
  );
};

export default function AvatarProfile() {
  const [error, setError] = useState(false);
  const { data: session } = useSession();

  const currentUser = useMemo(
    () => getCurrentUser(session?.user as UserSession),
    [session],
  );

  useEffect(() => {
    setError(!currentUser.image);
  }, [currentUser.image]);

  if (!session?.expires) return null;

  return (
    <Flex
      align="center"
      justify="space-between"
      gap="10px"
      className={styles.avatar}
    >
      {!error && currentUser.image ? (
        <Avatar
          className={styles.image}
          src={currentUser.image}
          onError={() => {
            setError(true);
            return true;
          }}
        />
      ) : (
        <AvatarFallback fullName={currentUser.fullName} />
      )}
      <Flex vertical>
        <Typography.Title level={3} className={styles.full_name}>
          {currentUser.fullName}
        </Typography.Title>
        <Typography.Text className={styles.role}>
          {currentUser.role}
        </Typography.Text>
      </Flex>
    </Flex>
  );
}
