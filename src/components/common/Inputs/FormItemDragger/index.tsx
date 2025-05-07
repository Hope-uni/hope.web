import DraggerImage from '@/components/common/Inputs/InputFile/DraggerImage';
import useUploadFile from '@/hooks/useUploadFile';
import { Form, FormItemProps } from 'antd';
import { ImgCropProps } from 'antd-img-crop';
import { OptimizedImageShapeType } from '@/components/common/OptimizedImage/OptimizedImageHelpers';
import { PreviewPlacementType } from '@/components/common/Inputs/InputFile/DraggerImageHerlpers';

type ImgCropWithoutChildren = Omit<ImgCropProps, 'children'>;

interface Props extends FormItemProps {
  imgCropProps?: ImgCropWithoutChildren;
  shape?: OptimizedImageShapeType;
  initialImage?: string;
  placeholderImage?: string;
  previewPlacement?: PreviewPlacementType;
}

const FormItemDragger = ({
  imgCropProps,
  shape,
  initialImage,
  placeholderImage,
  previewPlacement,
  ...uploadProps
}: Props) => {
  const { normFile } = useUploadFile();

  return (
    <Form.Item
      {...uploadProps}
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <DraggerImage
        imgCropProps={imgCropProps}
        shape={shape}
        initialImage={initialImage}
        placeholderImage={placeholderImage}
        previewPlacement={previewPlacement}
      />
    </Form.Item>
  );
};

export default FormItemDragger;
