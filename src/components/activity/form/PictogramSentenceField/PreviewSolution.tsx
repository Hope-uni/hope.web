import OrderableList from '@/components/common/OrderableList';
import PictogramItem from '@/components/pictogram/PictogramItem';
import { useFormActivityStore } from '@/lib/store/forms/formActivity';
import { SinglePictogram } from '@/models/schema';
import style from '@/styles/modules/activity.module.scss';
import { Typography } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onDeleteFromList?: (pictogram: SinglePictogram) => void;
  onClickItemList?: (pictogram: SinglePictogram) => void;
}

export const PreviewSolution = ({
  onDeleteFromList,
  onClickItemList,
}: Props) => {
  const { t } = useTranslation();
  const { solutionSentenceList, setSolutionSentenceList } =
    useFormActivityStore();

  const handleChangeOrder = useCallback(
    (newItemsOrdered: SinglePictogram[]) => {
      setSolutionSentenceList(newItemsOrdered);
    },
    [setSolutionSentenceList],
  );

  return (
    <div className={style.solution_preview}>
      <Typography.Title className={style.solution_preview_label}>
        {t('Activity.fields.pictogramSentence.labelPreviewSentence')}
      </Typography.Title>
      <Typography.Text className={style.solution_preview_caption}>
        {t('Activity.fields.pictogramSentence.captionPreviewSentence')}
      </Typography.Text>
      <div>
        <div className={style.solution_preview_pictograms}>
          {solutionSentenceList.length > 0 ? (
            <OrderableList<SinglePictogram>
              dataSource={solutionSentenceList}
              onChangeOrder={handleChangeOrder}
              onDeleteFromList={onDeleteFromList}
              renderItemInner={(pictogram) => (
                <div className={style.container_selected_pictogram}>
                  <PictogramItem
                    key={pictogram.id}
                    pictogram={pictogram}
                    sizeContainer={100}
                    sizeImg={80}
                    showLabel={false}
                    onClick={() =>
                      onClickItemList && onClickItemList(pictogram)
                    }
                  />
                </div>
              )}
            />
          ) : (
            <p className={style.placeholder_preview_sentence}>
              {t(
                'Activity.fields.pictogramSentence.placeholderPreviewSentence',
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
