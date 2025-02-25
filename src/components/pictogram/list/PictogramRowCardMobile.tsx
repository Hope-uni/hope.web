import { UnassignedTag } from '@/components/common';
import { SinglePictogram } from '@/models/schema';
import styles from '@/styles/modules/user.module.scss';
import { Flex, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import PictogramItem from '@/components/pictogram/PictogramItem';
import PictogramActions from '@/components/pictogram/list/PictogramActions';

interface Props {
  pictogram: SinglePictogram;
}

const PictogramRowCardMobile = ({ pictogram }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.user_row_card_mobile}>
      <div style={{ flex: 1 }}>
        <Flex vertical gap="10px" align="center">
          {pictogram?.category?.name ? (
            <Tag className="tag-role">{pictogram?.category?.name}</Tag>
          ) : (
            <UnassignedTag customLabel={t('common.uncategorized')} />
          )}

          <PictogramItem pictogram={pictogram} />
        </Flex>
      </div>

      <div>
        <div className="popup_actions_primary_vertical">
          <PictogramActions pictogram={pictogram} />
        </div>
      </div>
    </div>
  );
};

export default PictogramRowCardMobile;
