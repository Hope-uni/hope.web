/* eslint-disable react/display-name */
'use client';

import { Show } from '@/components/Show';
import { colorList } from '@/constants/Avatar';
import { UserProfileCard } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import {
  Avatar,
  Descriptions,
  Divider,
  Empty,
  Flex,
  Grid,
  Typography,
} from 'antd';
import { DescriptionsProps } from 'antd/lib';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
interface Props {
  user: UserProfileCard | null;
  layout?: 'vertical' | 'horizontal';
  title?: string;
  infoDescription?: DescriptionsProps['items'] | null;
  showUser?: boolean;
  menuAction?: JSX.Element;
}

interface AvatarProfileProps {
  imageProfile?: string | null;
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
  menuAction,
}: Props) {
  const screens = useBreakpoint();
  const { t } = useTranslation();

  if (layout === 'vertical') {
    return (
      <div className={styles.card_profile} style={{ flex: 1 }}>
        <div className={styles.card_profile_header_menu}>
          {title && <Title className={styles.title_card}>{title}</Title>}
          <Show>
            <Show.When isTrue={!!menuAction && !!user}>{menuAction}</Show.When>
          </Show>
        </div>
        {user && infoDescription ? (
          <>
            {screens.sm && (
              <>
                <Flex vertical align="center" justify="flex-start" gap={10}>
                  <AvatarProfile
                    imageProfile={user.image}
                    userId={user.id}
                    size={60}
                  />
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
              </>
            )}
            {infoDescription && infoDescription?.length > 0 && (
              <Descriptions
                items={infoDescription}
                column={1}
                className="card_profile_descriptions"
                layout={screens.sm ? 'horizontal' : 'vertical'}
              />
            )}
          </>
        ) : (
          <Flex justify="center">
            <Empty
              description={t('Patient.detail.feedback.no_therapist_assigned')}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Flex>
        )}
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className={styles.card_profile_row}>
          <AvatarProfile userId={user.id} size={screens.xs ? 120 : 85} />
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
            <Flex gap={8} justify={screens.xs ? 'center' : 'start'}>
              <Text className={styles.caption}>
                {user.age} {t('components.CardProfile.years_old')}
              </Text>
              |<Text className={styles.caption}>{user.gender}</Text>
            </Flex>
            {showUser && (
              <Text className={styles.username}>@{user.username}</Text>
            )}
          </Flex>
        </div>
      ) : null}
    </>
  );
}
