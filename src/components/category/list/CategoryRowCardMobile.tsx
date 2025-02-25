import CategoryActions from '@/components/category/list/CategoryActions';
import { CategoryPictogram } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import { Flex, Image } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  category: CategoryPictogram;
}

const CategoryRowCardMobile = ({ category }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.user_row_card_mobile}>
      <div style={{ flex: 1 }}>
        <Flex vertical gap="10px" align="center">
          <Image
            src={String(category.icon)}
            width={60}
            height={60}
            alt={category.name}
          />
          <span>{category.name}</span>
        </Flex>
      </div>

      <div>
        <div className="popup_actions_primary_vertical">
          <CategoryActions category={category} />
        </div>
      </div>
    </div>
  );
};

export default CategoryRowCardMobile;
