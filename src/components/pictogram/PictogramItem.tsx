'use client';

import { Pictogram } from '@/models/schema/Pictogram';
import styles from '@/styles/modules/pictogram.module.scss';
import { Flex, Typography } from 'antd';
import Image from 'next/image';

const { Text } = Typography;

interface Props {
  pictogram: Pictogram;
}

export default function PictogramItem({ pictogram }: Props) {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className={styles.pictogram_list_item}
      gap={5}
    >
      <Image
        className={styles.pictogram_list_item_image}
        src={pictogram.image}
        width={50}
        height={50}
        alt={pictogram.name}
      />

      <Text className={styles.pictogram_list_item_name}>{pictogram.name}</Text>
    </Flex>
  );
}
