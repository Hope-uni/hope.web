import OptimizedImage from '@/components/common/OptimizedImage';
import { Achievement } from '@/models/schema';
import styles from '@/styles/modules/achievement.module.scss';
import { Divider, Flex, Typography } from 'antd';
import AchievementActions from './AchievementActions';

const { Text } = Typography;

interface Props {
  achievement: Achievement;
}

const AchievementGridCard = ({ achievement }: Props) => {
  return (
    <div className={styles.achievement_grid_card}>
      <div className={styles.achievement_grid_card_inner}>
        <div style={{ flex: 1 }}>
          <Flex vertical gap="10px" align="center">
            <OptimizedImage
              srcImage={achievement.imageUrl}
              size={100}
              alt={achievement.name}
              customStyle={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
              }}
            />
          </Flex>
        </div>

        <Divider
          style={{
            margin: '10px 0',
          }}
        />

        <Flex
          justify="flex-start"
          className={styles.achievement_header_container}
        >
          <Text className={styles.achievement_text}>{achievement.name}</Text>
          <div
            className={`popup_actions_primary_vertical ${styles.popup_actions_absolute}`}
          >
            <AchievementActions achievement={achievement} />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default AchievementGridCard;
