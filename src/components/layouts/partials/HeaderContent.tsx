'use client';

import styles from '@/styles/modules/partials.module.scss';
import { Button, Flex, Typography } from 'antd';
import Link from 'next/link';
import { BsPlusLg } from 'react-icons/bs';

const { Title, Text } = Typography;

interface Props {
  title: string;
  caption?: string;
  label?: string;
  routeLink?: string;
  customBtn?: JSX.Element;
}

export const HeaderContent = ({
  title,
  caption = '',
  label = '',
  routeLink,
  customBtn,
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
          <Button
            type="default"
            icon={<BsPlusLg />}
            className={styles.btn_add_content}
          >
            <span className={styles.btn_add_content_label}>{label}</span>
          </Button>
        </Link>
      )}
      {customBtn && customBtn}
    </Flex>
  );
};
