import CategoryActions from '@/components/category/list/CategoryActions';
import OptimizedImage from '@/components/common/OptimizedImage';
import { CategoryPictogram } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import { Flex } from 'antd';

interface Props {
  category: CategoryPictogram;
  showActions?: boolean;
}

const CategoryRowCardMobile = ({ category, showActions }: Props) => {
  return (
    <div className={styles.user_row_card_mobile}>
      <div style={{ flex: 1 }}>
        <Flex vertical gap="10px" align="center">
          <OptimizedImage
            srcImage={category.icon}
            size={60}
            alt={category.name}
          />
          <span>{category.name}</span>
        </Flex>
      </div>
      {showActions && (
        <div>
          <div className="popup_actions_primary_vertical">
            <CategoryActions category={category} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryRowCardMobile;
