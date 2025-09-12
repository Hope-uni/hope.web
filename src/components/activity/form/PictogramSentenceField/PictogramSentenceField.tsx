import { PreviewSolution } from '@/components/activity/form/PictogramSentenceField/PreviewSolution';
import PictogramItem from '@/components/pictogram/PictogramItem';
import { PictogramSplide } from '@/config/splide';
import { useFormActivityStore } from '@/lib/store/forms/formActivity';
import { SinglePictogram } from '@/models/schema';
import style from '@/styles/modules/activity.module.scss';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Empty, Grid, Spin, Typography } from 'antd';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  FaCaretLeft,
  FaCaretRight,
  FaCircleInfo,
  FaTrashCan,
} from 'react-icons/fa6';

const { useBreakpoint } = Grid;

const styleSelectedPictogram = {
  borderColor: '#4CAF50',
  backgroundColor: '#DDFFDD',
  borderWidth: '3px',
  cursor: 'default',
};

const styleSelectedPictogramDefault = {
  cursor: 'pointer',
};

interface Props {
  value?: SinglePictogram[];
  onChange?: (value: number[]) => void;
}

const PictogramSentenceField = forwardRef(
  ({ value = [], onChange }: Props, ref) => {
    const screens = useBreakpoint();
    const { t } = useTranslation();
    const {
      pictogramList,
      solutionSentenceList,
      isRefetchingPictograms,
      setSolutionSentenceText,
      setSolutionSentenceList,
    } = useFormActivityStore();

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      setSolutionSentenceText(
        solutionSentenceList.map((item) => item.name).join(' '),
      );
    }, [setSolutionSentenceText, solutionSentenceList]);

    const handleSelectPictogram = useCallback(
      (pictogram: SinglePictogram) => {
        const pictogramExist = solutionSentenceList?.some(
          (item) => item.id === pictogram.id,
        );

        if (!pictogramExist) {
          const newList = [...(solutionSentenceList || []), pictogram];
          setSolutionSentenceList(newList);
          onChange?.(newList.map((item) => item.id));
        }
      },
      [onChange, setSolutionSentenceList, solutionSentenceList],
    );

    const handleUnSelectPictogram = useCallback(
      (pictogram: SinglePictogram) => {
        if (solutionSentenceList && solutionSentenceList.length === 0) {
          return;
        }

        const pictogramsFiltered = solutionSentenceList?.filter(
          (item) => item.id !== pictogram.id,
        );

        const newList = pictogramsFiltered || [];
        setSolutionSentenceList(newList);
        onChange?.(newList.map((item) => item.id));
      },
      [onChange, setSolutionSentenceList, solutionSentenceList],
    );

    const isSelectedPictogram = useCallback(
      (id: number) => {
        return solutionSentenceList?.some((item) => item.id === id);
      },
      [solutionSentenceList],
    );

    return (
      <div ref={containerRef} className={style.pictogram_sentence_wrapper}>
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
          {pictogramList.length > 0 ? (
            <>
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
                  <button
                    type="button"
                    className="splide__arrow splide__arrow--prev"
                  >
                    <FaCaretLeft size="24px" />
                  </button>
                  <button
                    type="button"
                    className="splide__arrow splide__arrow--next"
                  >
                    <FaCaretRight size="24px" />
                  </button>
                </div>
              </Splide>
            </>
          ) : (
            <Empty
              description={t(
                'Therapist.actions.assign_patients.feedback.no_selected',
              )}
              style={{ marginBlock: 30 }}
            />
          )}

          <Typography.Text className={style.caption_overlay_pictogram}>
            {screens.sm
              ? t(
                  'Activity.fields.pictogramSentence.captionOverlayPictogramDesktop',
                )
              : t(
                  'Activity.fields.pictogramSentence.captionOverlayPictogramMobile',
                )}
          </Typography.Text>

          {isRefetchingPictograms && (
            <div className={style.loading_pictograms_filtering}>
              <Spin />
            </div>
          )}
        </div>
        <PreviewSolution
          onClickItemList={handleSelectPictogram}
          onDeleteFromList={handleUnSelectPictogram}
        />
      </div>
    );
  },
);

PictogramSentenceField.displayName = 'PictogramSentenceField';

export default PictogramSentenceField;
