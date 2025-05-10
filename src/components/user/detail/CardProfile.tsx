/* eslint-disable react/display-name */
'use client';

import OptimizedImage from '@/components/common/OptimizedImage';
import { Show } from '@/components/Show';
import { ROLES } from '@/constants/guards';
import { RoleKeyType } from '@/constants/guards/types';
import { UserProfileCard } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import {
  Descriptions,
  Divider,
  Empty,
  Flex,
  Grid,
  Tag,
  Typography,
} from 'antd';
import { DescriptionsProps } from 'antd/lib';
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
  roleName?: RoleKeyType;
}

export default function CardProfile({
  user,
  layout = 'horizontal',
  title,
  infoDescription,
  showUser = false,
  menuAction,
  roleName,
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
                  <OptimizedImage
                    srcImage={user.imageUrl}
                    size={60}
                    shape="circle"
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
          <OptimizedImage
            srcImage={user.imageUrl}
            size={screens.xs ? 120 : 85}
            shape="circle"
          />
          <Flex vertical gap={screens.xs ? 8 : 0}>
            <Flex
              gap={5}
              align={screens.xs ? 'center' : 'left'}
              justify={screens.xs ? 'center' : 'left'}
              vertical
            >
              {roleName && (
                <Tag
                  className="tag-role"
                  style={{
                    width: 'max-content',
                  }}
                >
                  <strong>{ROLES[roleName]}</strong>
                </Tag>
              )}
              <Title
                level={3}
                className={styles.full_name}
                style={{
                  fontSize: '22px',
                }}
              >
                {user.fullName}
              </Title>
            </Flex>

            <Flex vertical>
              <Flex gap={8} justify={screens.xs ? 'center' : 'start'}>
                <Text className={styles.caption}>
                  {`${user.age} ${t('components.CardProfile.years_old')} | ${user.gender}`}
                </Text>
              </Flex>

              {showUser && (
                <Flex justify={screens.xs ? 'center' : 'start'}>
                  <Text className={styles.username}>@{user.username}</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </div>
      ) : null}
    </>
  );
}
