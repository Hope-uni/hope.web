import {
  OptimizedImageShapeType,
  StylesShape,
} from '@/components/common/OptimizedImage/OptimizedImageHelpers';
import { IMAGE_PLACEHOLDER } from '@/constants/OptimizedImage';
import { Grid, Image, Skeleton, type ImageProps } from 'antd';
import { CSSProperties, useEffect, useMemo, useState } from 'react';

const { useBreakpoint } = Grid;

interface ResponsiveItem {
  src?: string | null;
  width?: string | number;
  height?: string | number;
  size?: string | number;
}

interface Props extends ImageProps {
  srcImage?: string | null;
  placeholderImage?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  size?: string | number;
  shape?: OptimizedImageShapeType;
  mobileResponsive?: ResponsiveItem;
  objectFit?: CSSProperties['objectFit'];
  className?: string;
  customStyle?: CSSProperties;
}

const OptimizedImage = ({
  srcImage,
  placeholderImage = IMAGE_PLACEHOLDER.DEFAULT,
  width,
  height,
  size,
  preview = false,
  shape = 'square',
  mobileResponsive,
  objectFit = 'contain',
  className,
  customStyle,
  alt,
  ...rest
}: Props) => {
  const screens = useBreakpoint();
  const [error, setError] = useState(false);

  const finalSrc = useMemo(() => {
    if (srcImage && !error) {
      return screens.sm ? mobileResponsive?.src || srcImage : srcImage;
    }
    return placeholderImage.toString();
  }, [srcImage, error, placeholderImage, screens.sm, mobileResponsive?.src]);

  const styleSize = useMemo(() => {
    const currentWidth = size || width;
    const currentHeight = size || height;

    return screens.xs
      ? {
          width: mobileResponsive?.width || currentWidth,
          height: mobileResponsive?.height || currentHeight,
        }
      : {
          width: currentWidth,
          height: currentHeight,
        };
  }, [mobileResponsive, screens, width, height, size]);

  useEffect(() => {
    setError(!finalSrc);
  }, [finalSrc]);

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fallback={placeholderImage.toString()}
      preview={preview}
      rootClassName={className}
      style={{
        ...styleSize,
        ...StylesShape[shape],
        objectFit,
        objectPosition: 'center',
        ...customStyle,
      }}
      placeholder={
        <Skeleton.Node
          active={true}
          style={{
            ...styleSize,
            ...StylesShape[shape],
            objectFit,
            objectPosition: 'center',
          }}
        />
      }
      {...rest}
    />
  );
};

export default OptimizedImage;
