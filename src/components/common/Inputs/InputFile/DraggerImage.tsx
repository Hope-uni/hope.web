import OptimizedImage from '@/components/common/OptimizedImage';
import { IMAGE_PLACEHOLDER } from '@/constants/OptimizedImage';
import { RegexRules } from '@/constants/rules';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import useUploadFile from '@/hooks/useUploadFile';
import { Flex, Grid, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCloudDownloadFill } from 'react-icons/bs';
import { OptimizedImageShapeType } from '@/components/common/OptimizedImage/OptimizedImageHelpers';
import {
  PREVIEW_PLACEMENT,
  PreviewPlacementType,
} from '@/components/common/Inputs/InputFile/DraggerImageHerlpers';

const { useBreakpoint } = Grid;
const { Dragger } = Upload;

type ImgCropWithoutChildren = Omit<ImgCropProps, 'children'>;

interface Props {
  placeholderImage?: string;
  id?: string;
  value?: UploadFile[];
  previewPlacement?: PreviewPlacementType;
  imgCropProps?: ImgCropWithoutChildren;
  shape?: OptimizedImageShapeType;
  initialImage?: string;
  onChange?: UploadProps['onChange'];
}

const DraggerImage = ({
  placeholderImage = IMAGE_PLACEHOLDER.DEFAULT,
  id,
  value,
  previewPlacement = PREVIEW_PLACEMENT.INSIDE,
  imgCropProps,
  shape,
  initialImage,
  onChange,
}: Props) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const { openNotification } = useOpenNotification();
  const { handleOnPreview, handleOnChange, handleOnRemove, previewImage } =
    useUploadFile();

  const currentPreviewImage = useMemo(() => {
    if (initialImage && !previewImage) {
      return initialImage;
    }

    return previewImage;
  }, [initialImage, previewImage]);

  const imgCropDefaultProps = useMemo(
    () => ({
      modalTitle: t('components.dragger.modal_crop.title'),
      modalOk: t('components.dragger.modal_crop.ok_text'),
      modalCancel: t('components.dragger.modal_crop.cancel_text'),
      ...imgCropProps,
    }),
    [imgCropProps, t],
  );

  const triggerChange: UploadProps['onChange'] = (info) => {
    handleOnChange(info);
    onChange?.(info);
  };

  const handleBeforeUpload = useCallback(
    (file: UploadFile) => {
      const isTypeValidate = RegexRules.imageAllowed.test(String(file.type));

      if (!isTypeValidate) {
        openNotification.error({
          message: t('components.dragger.errors.title'),
          description: t('components.dragger.errors.invalid_type'),
        });
      }

      return isTypeValidate || Upload.LIST_IGNORE;
    },
    [openNotification, t],
  );

  const handleBeforeCrop = useCallback((file: UploadFile) => {
    const isTypeValidate = RegexRules.imageAllowed.test(String(file.type));

    return isTypeValidate;
  }, []);

  return (
    <div id={id} className="ant-upload-wrapper">
      <Flex gap={30} className="flex_upload_dragger">
        {previewPlacement === PREVIEW_PLACEMENT.OUTSIDE && (
          <OptimizedImage
            srcImage={currentPreviewImage}
            size="80px"
            placeholderImage={placeholderImage}
            shape={shape}
          />
        )}
        <ImgCrop {...imgCropDefaultProps} beforeCrop={handleBeforeCrop}>
          <Dragger
            className="uploadDragger"
            maxCount={1}
            fileList={value}
            accept=".png, .jpg, .jpeg, .svg, .webp"
            onPreview={handleOnPreview}
            beforeUpload={handleBeforeUpload}
            onChange={triggerChange}
            onRemove={handleOnRemove}
          >
            <Flex gap={30} align="center" vertical={screens.xs}>
              {previewPlacement === PREVIEW_PLACEMENT.INSIDE && (
                <OptimizedImage
                  srcImage={currentPreviewImage}
                  size="80px"
                  shape={shape}
                  placeholderImage={placeholderImage}
                />
              )}
              <Flex
                justify="center"
                vertical
                style={{
                  width: '100%',
                }}
              >
                <p className="ant-upload-drag-icon">
                  <BsCloudDownloadFill size={30} />
                </p>
                <p className="ant-upload-text">
                  <strong>{t('components.dragger.title_bold')}</strong>{' '}
                  {t('components.dragger.title_regular')}
                </p>
                <p className="ant-upload-hint">
                  {t('components.dragger.caption')}
                </p>
              </Flex>
            </Flex>
          </Dragger>
        </ImgCrop>
      </Flex>
    </div>
  );
};

export default DraggerImage;
