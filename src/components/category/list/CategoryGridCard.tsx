import OptimizedImage from '@/components/common/OptimizedImage';
import { CategoryPictogram } from '@/models/schema';
import styles from '@/styles/modules/pictogram.module.scss';
import { Divider, Flex, Typography } from 'antd';
import CategoryActions from './CategoryActions';

const { Text } = Typography;

interface Props {
  category: CategoryPictogram;
}

const CategoryGridCard = ({ category }: Props) => {
  return (
    <div className={styles.pictogram_grid_card}>
      <div className={styles.category_pictogram_grid_card_inner}>
        <div style={{ flex: 1 }}>
          <Flex vertical gap="10px" align="center">
            <OptimizedImage
              srcImage={category.icon}
              size={100}
              alt={category.name}
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
          style={{ flex: 1, width: '100%', paddingRight: '35px' }}
        >
          <Text
            className="text-ellipse"
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {category.name}
          </Text>
          <div
            className={`popup_actions_primary_vertical ${styles.popup_actions_absolute}`}
          >
            <CategoryActions category={category} />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default CategoryGridCard;
