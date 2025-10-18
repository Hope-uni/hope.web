import { UnassignedTag } from '@/components/common';
import PictogramItem from '@/components/pictogram/PictogramItem';
import PictogramActions from '@/components/pictogram/list/PictogramActions';
import { SinglePictogram } from '@/models/schema';
import styles from '@/styles/modules/pictogram.module.scss';
import { Divider, Flex, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface Props {
  pictogram: SinglePictogram;
}

const PictogramGridCard = ({ pictogram }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.pictogram_grid_card}>
      <div className={styles.pictogram_grid_card_inner}>
        <div style={{ flex: 1 }}>
          <Flex vertical gap="10px" align="center">
            <PictogramItem
              pictogram={pictogram}
              showLabel={false}
              sizeImg={150}
              style={{
                width: '100%',
                height: '100%',
                maxWidth: 160,
                maxHeight: 160,
                borderWidth: 0,
                borderRadius: 0,
              }}
              styleImg={{
                aspectRatio: '1 / 1',
                width: '100%',
                height: '100%',
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
          style={{ flex: 1, width: '100%', paddingRight: '35px' }}
        >
          <Text
            className="text-ellipse"
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {pictogram.name}
          </Text>
          <div
            className={`popup_actions_primary_vertical ${styles.popup_actions_absolute}`}
          >
            <PictogramActions pictogram={pictogram} />
          </div>
        </Flex>

        <div className={styles.tag_category_container}>
          {pictogram?.category?.name ? (
            <Tag className="tag-role">{pictogram?.category?.name}</Tag>
          ) : (
            <UnassignedTag customLabel={t('common.uncategorized')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PictogramGridCard;
