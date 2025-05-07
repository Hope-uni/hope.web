'use client';

import OptimizedImage from '@/components/common/OptimizedImage';
import { Achievement } from '@/models/schema/Achievement';
import styles from '@/styles/modules/achievement.module.scss';
import { Flex, Tooltip, Typography } from 'antd';

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
    <Tooltip title={achievement.name}>
      <Flex
        vertical
        justify="center"
        align="center"
        className={styles.achievement_list_item}
        gap={5}
      >
        <OptimizedImage
          srcImage={achievement.imageUrl}
          size={35}
          alt={achievement.name}
        />

        {showLabel && (
          <Text className={styles.achievement_list_item_name}>
            {achievement.name}
          </Text>
        )}
      </Flex>
    </Tooltip>
  );
}
