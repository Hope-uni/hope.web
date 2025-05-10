import AchievementActions from '@/components/achievement/list/AchievementActions';
import OptimizedImage from '@/components/common/OptimizedImage';
import { Achievement } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import { Flex } from 'antd';

interface Props {
  achievement: Achievement;
  showActions?: boolean;
}

const AchievementRowCardMobile = ({ achievement, showActions }: Props) => {
  return (
    <div className={styles.user_row_card_mobile}>
      <div style={{ flex: 1 }}>
        <Flex vertical gap="10px" align="center">
          <OptimizedImage
            srcImage={achievement.imageUrl}
            size={60}
            alt={achievement.name}
          />
          <span>{achievement.name}</span>
        </Flex>
      </div>
      {showActions && (
        <div>
          <div className="popup_actions_primary_vertical">
            <AchievementActions achievement={achievement} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementRowCardMobile;
