'use client';

import { Achievement } from '@/models/schema/Achievement';
import styles from '@/styles/modules/achievement.module.scss';
import { Flex, Typography } from 'antd';
import Image from 'next/image';

const { Text } = Typography;

interface Props {
  achievement: Achievement;
  showLabel?: boolean;
}

export default function AchievementItem({
  achievement,
  showLabel = false,
}: Props) {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className={styles.achievement_list_item}
      gap={5}
    >
      <Image
        className={styles.achievement_list_item_image}
        src={achievement.image}
        width={35}
        height={35}
        alt={achievement.name}
      />

      {showLabel && (
        <Text className={styles.achievement_list_item_name}>
          {achievement.name}
        </Text>
      )}
    </Flex>
  );
}
