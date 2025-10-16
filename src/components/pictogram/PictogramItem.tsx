'use client';

import OptimizedImage from '@/components/common/OptimizedImage';
import HoldablePress from '@/components/HoldablePress';
import { IMAGE_PLACEHOLDER } from '@/constants/OptimizedImage';
import { validateDeviceUserIsMobile } from '@/constants/rules';
import { SinglePictogramWithOutCategory } from '@/models/schema/Pictogram';
import styles from '@/styles/modules/pictogram.module.scss';
import { Flex, Typography } from 'antd';
import { CSSProperties, MouseEvent, useCallback, useState } from 'react';

const { Text } = Typography;

interface Props {
  pictogram: SinglePictogramWithOutCategory;
  sizeContainer?: number | string;
  sizeImg?: number;
  fontSize?: string;
  showLabel?: boolean;
  style?: CSSProperties;
  styleImg?: CSSProperties;
  styleOverlayText?: CSSProperties;
  onClick?: (pictogram: SinglePictogramWithOutCategory) => void;
}

export default function PictogramItem({
  pictogram,
  sizeContainer = 180,
  sizeImg = 125,
  fontSize = '16px',
  showLabel = true,
  style,
  styleImg,
  styleOverlayText,
  onClick,
}: Props) {
  const [isOverlaid, setIsOverlaid] = useState(false);

  const handleThresholdReached = () => {
    setIsOverlaid(true);
  };

  const handleStopPress = () => {
    setIsOverlaid(false);
  };

  const handleMouseEnter = () => {
    if (!validateDeviceUserIsMobile()) {
      handleThresholdReached();
    }
  };

  const handleMouseLeave = () => {
    if (!validateDeviceUserIsMobile()) {
      handleStopPress();
    }
  };

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (onClick) {
        onClick(pictogram);
      }
    },
    [onClick, pictogram],
  );

  return (
    <HoldablePress
      type="button"
      className={styles.btn_pictogram}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onThresholdReached={handleThresholdReached}
      onStopPress={handleStopPress}
      style={
        isOverlaid
          ? {
              overflow: 'hidden',
              borderRadius: `${Number(sizeContainer) / 5}px`,
            }
          : {}
      }
    >
      <Flex
        vertical
        justify="center"
        align="center"
        className={styles.pictogram_list_item}
        gap={5}
        style={{
          overflow: 'hidden',
          width: sizeContainer,
          height: sizeContainer,
          padding: '5px',
          borderRadius: `${Number(sizeContainer) / 5}px`,
          borderWidth: 1,
          ...style,
        }}
      >
        <OptimizedImage
          className={styles.pictogram_list_item_image}
          srcImage={pictogram.imageUrl}
          placeholderImage={IMAGE_PLACEHOLDER.PICTOGRAM}
          size={sizeImg}
          alt={pictogram.name}
          customStyle={{ ...styleImg }}
        />

        {showLabel && (
          <>
            <Text
              className={styles.pictogram_list_item_name}
              style={{
                fontSize: fontSize,
                fontWeight: 'bold',
              }}
            >
              {pictogram.name}
            </Text>
          </>
        )}
        {isOverlaid && (
          <div className={styles.pictogram_overlay_item}>
            <Text
              className={styles.pictogram_overlay_item_text}
              style={{
                ...styleOverlayText,
              }}
            >
              {pictogram.name}
            </Text>
          </div>
        )}
      </Flex>
    </HoldablePress>
  );
}
