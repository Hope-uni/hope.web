/* eslint-disable react/display-name */
'use client';

import { colorList } from '@/constants/Avatar';
import styles from '@/styles/modules/user.module.scss';
import { Avatar, Descriptions, Divider, Flex, Typography } from 'antd';
import { DescriptionsProps } from 'antd/lib';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { BsChevronRight } from 'react-icons/bs';

const { Title, Text } = Typography;

interface Props {
  user: any;
  layout?: 'vertical' | 'horizontal';
  title?: string;
  infoDescription?: DescriptionsProps['items'];
  showUser?: boolean;
}

interface AvatarProfileProps {
  imageProfile?: string;
  userId: number;
  size: number;
}

const AvatarProfile = memo(
  ({ imageProfile, userId, size }: AvatarProfileProps) => {
    const avatarSrc =
      imageProfile || `https://api.dicebear.com/7.x/miniavs/svg?seed=${userId}`;

    return (
      <Avatar
        src={avatarSrc}
        size={size}
        style={{
          backgroundColor: colorList.s,
        }}
      />
    );
  },
);

export default function CardProfile({
  user,
  layout = 'horizontal',
  title,
  infoDescription,
  showUser = false,
}: Props) {
  const t_actions = useTranslations('_.Actions');
  const t_components = useTranslations('_.components');

  if (layout === 'vertical') {
    return (
      <Flex
        gap="10px"
        className={styles.card_profile}
        vertical
        justify="center"
      >
        {title && <Title className={styles.title_card}>{title}</Title>}
        <Flex vertical align="center" justify="flex-start" gap={10}>
          <AvatarProfile userId={user.id} size={60} />
          <Flex vertical gap={3} align="center">
            <Title
              level={3}
              className={styles.full_name}
              style={{
                fontSize: '16px',
                lineHeight: '20px',
                textAlign: 'center',
              }}
            >
              {user.fullName}
            </Title>
          </Flex>
          <Flex justify="end">
            <Flex align="center" className={styles.profile_detail} gap={4}>
              <Text className={styles.profile_detail_text}>
                {t_actions('view_detail')}
              </Text>
              <BsChevronRight size="12px" />
            </Flex>
          </Flex>
        </Flex>
        <Divider
          dashed={true}
          style={{
            borderColor: '#626262',
            borderStyle: 'dashed',
            borderWidth: '2px 0 0',
            margin: '10px',
          }}
        />
        {infoDescription && infoDescription?.length > 0 && (
          <Descriptions
            items={infoDescription}
            column={1}
            className="card_profile_descriptions"
          />
        )}
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justify="flex-start"
      gap="10px"
      className={styles.card_profile}
    >
      <AvatarProfile userId={user.id} size={85} />
      <Flex vertical>
        <Title
          level={3}
          className={styles.full_name}
          style={{
            fontSize: '22px',
          }}
        >
          {user.fullName}
        </Title>
        <Flex gap={8}>
          <Text className={styles.caption}>
            {user.age} {t_components('CardProfile.years_old')}
          </Text>
          |<Text className={styles.caption}>{user.gender}</Text>
        </Flex>
        {showUser && <Text className={styles.username}>@{user.username}</Text>}
      </Flex>
    </Flex>
  );
}
