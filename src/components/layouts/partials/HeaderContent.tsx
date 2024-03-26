'use client';

import { Link } from '@/intl-navigation';
import styles from '@/styles/modules/partials.module.scss';
import { Button, Flex, Typography } from 'antd';

const { Title, Text } = Typography;

interface Props {
  title: string;
  caption?: string;
  label?: string;
  routeLink?: string;
}

export const HeaderContent = ({
  title,
  caption = '',
  label = '',
  routeLink,
}: Props) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      className={styles.wrapper_header_content}
    >
      <Flex vertical>
        <Title level={1} className={styles.title}>
          {title}
        </Title>
        {caption && <Text className={styles.caption}>{caption}</Text>}
      </Flex>
      {routeLink && label && (
        <Link href={routeLink}>
          <Button type="default">{label}</Button>
        </Link>
      )}
    </Flex>
  );
};
