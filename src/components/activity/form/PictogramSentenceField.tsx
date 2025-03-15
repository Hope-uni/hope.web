import OrderableList from '@/components/common/OrderableList';
import PictogramItem from '@/components/pictogram/PictogramItem';
import { useFormActivityStore } from '@/lib/store/forms/formActivity';
import { SinglePictogram } from '@/models/schema';
import style from '@/styles/modules/activity.module.scss';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Grid, Input, Typography } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  FaCaretLeft,
  FaCaretRight,
  FaCircleInfo,
  FaTrashCan,
} from 'react-icons/fa6';

const { useBreakpoint } = Grid;

const PictogramSplide = {
  rewind: true,
  gap: '10px',
  autoWidth: true,
  pagination: false,
};

const styleSelectedPictogram = {
  borderColor: '#4CAF50',
  backgroundColor: '#DDFFDD',
  borderWidth: '3px',
  cursor: 'default',
};

const styleSelectedPictogramDefault = {
  cursor: 'pointer',
};

const PictogramSentenceField = () => {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const {
    pictogramList,
    solutionSentenceList,
    solutionSentenceText,
    setSolutionSentenceText,
    setSolutionSentenceList,
  } = useFormActivityStore();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      setSolutionSentenceList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSolutionSentenceText(
      solutionSentenceList.map((item) => item.name).join(' '),
    );
  }, [setSolutionSentenceText, solutionSentenceList]);

  const handleSelectPictogram = useCallback(
    (pictogram: SinglePictogram) => {
      if (solutionSentenceList && solutionSentenceList.length === 0) {
        setSolutionSentenceList([pictogram]);

        return;
      }

      const pictogramExist = solutionSentenceList?.some(
        (item) => item.id === pictogram.id,
      );

      if (!pictogramExist) {
        setSolutionSentenceList([...(solutionSentenceList || []), pictogram]);
      }
    },
    [setSolutionSentenceList, solutionSentenceList],
  );

  const handleUnSelectPictogram = useCallback(
    (pictogram: SinglePictogram) => {
      if (solutionSentenceList && solutionSentenceList.length === 0) {
        return;
      }

      const pictogramExist = solutionSentenceList?.some(
        (item) => item.id === pictogram.id,
      );

      if (pictogramExist) {
        const pictogramsFiltered = solutionSentenceList?.filter(
          (item) => item.id !== pictogram.id,
        );

        setSolutionSentenceList(pictogramsFiltered || []);
      }
    },
    [setSolutionSentenceList, solutionSentenceList],
  );

  const handleChangeOrder = useCallback(
    (newItemsOrdered: SinglePictogram[]) => {
      setSolutionSentenceList(newItemsOrdered);
    },
    [setSolutionSentenceList],
  );

  const isSelectedPictogram = useCallback(
    (id: number) => {
      return solutionSentenceList?.some((item) => item.id === id);
    },
    [solutionSentenceList],
  );

  return (
    <div ref={containerRef} className={style.pictogram_sentence_wrapper}>
      {/* TODO implements search pictograms by name and category */}
      {/* <Search
        placeholder={t('Activity.fields.pictogramSentence.placeholderSearch')}
        allowClear
      /> */}
      <div className={style.pictograms_slider}>
        <div className={style.caption_select_pictogram}>
          <FaCircleInfo />
          <Typography.Text className={style.caption_text}>
            <Trans
              i18nKey="Activity.fields.pictogramSentence.captionSelectPictograms"
              components={{ bold: <strong /> }}
            />
          </Typography.Text>
        </div>

        <Splide
          id="splide-pictograms"
          aria-label="pictograms_list"
          options={PictogramSplide}
          hasTrack={false}
        >
          <SplideTrack>
            {pictogramList.map((pictogram) => (
              <SplideSlide key={pictogram.id}>
                <div className={style.container_selected_pictogram}>
                  <PictogramItem
                    key={pictogram.id}
                    pictogram={pictogram}
                    style={
                      isSelectedPictogram(pictogram.id)
                        ? styleSelectedPictogram
                        : styleSelectedPictogramDefault
                    }
                    onClick={() => handleSelectPictogram(pictogram)}
                  />
                  {isSelectedPictogram(pictogram.id) && (
                    <button
                      type="button"
                      className={style.btn_unselect_pictogram}
                      onClick={() => handleUnSelectPictogram(pictogram)}
                    >
                      <FaTrashCan size="12px" />
                    </button>
                  )}
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>
          <div className="splide__arrows">
            <button type="button" className="splide__arrow splide__arrow--prev">
              <FaCaretLeft size="24px" />
            </button>
            <button type="button" className="splide__arrow splide__arrow--next">
              <FaCaretRight size="24px" />
            </button>
          </div>
        </Splide>

        <Typography.Text className={style.caption_overlay_pictogram}>
          {screens.sm
            ? t(
                'Activity.fields.pictogramSentence.captionOverlayPictogramDesktop',
              )
            : t(
                'Activity.fields.pictogramSentence.captionOverlayPictogramMobile',
              )}
        </Typography.Text>
      </div>
      <div className={style.solution_preview}>
        <Typography.Title className={style.solution_preview_label}>
          {t('Activity.fields.pictogramSentence.labelPreviewSentence')}
        </Typography.Title>
        <Typography.Text className={style.solution_preview_caption}>
          {t('Activity.fields.pictogramSentence.captionPreviewSentence')}
        </Typography.Text>
        <div>
          <div className={style.solution_preview_pictograms}>
            <OrderableList<SinglePictogram>
              dataSource={solutionSentenceList}
              onChangeOrder={handleChangeOrder}
              onDeleteFromList={handleUnSelectPictogram}
              renderItemInner={(pictogram) => (
                <div className={style.container_selected_pictogram}>
                  <PictogramItem
                    key={pictogram.id}
                    pictogram={pictogram}
                    sizeContainer={100}
                    sizeImg={80}
                    showLabel={false}
                    onClick={() => handleSelectPictogram(pictogram)}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <Input
        readOnly
        value={solutionSentenceText}
        placeholder={t('Activity.fields.satisfactoryPoints.placeholder')}
        style={{
          pointerEvents: 'none',
          marginTop: '5px',
        }}
      />
    </div>
  );
};

export default PictogramSentenceField;
