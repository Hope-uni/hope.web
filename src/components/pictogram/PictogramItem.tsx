'use client';

import OptimizedImage from '@/components/common/OptimizedImage';
import HoldablePress from '@/components/HoldablePress';
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
  onClick?: (pictogram: SinglePictogramWithOutCategory) => void;
}

export default function PictogramItem({
  pictogram,
  sizeContainer = 180,
  sizeImg = 125,
  fontSize = '16px',
  showLabel = true,
  style,
  onClick,
}: Props) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleThresholdReached = () => {
    setShowOverlay(true);
  };

  const handleStopPress = () => {
    setShowOverlay(false);
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
    >
      <Flex
        vertical
        justify="center"
        align="center"
        className={styles.pictogram_list_item}
        gap={5}
        style={{
          width: sizeContainer,
          height: sizeContainer,
          padding: '5px',
          borderRadius: `${Number(sizeContainer) / 5}px`,
          ...style,
        }}
      >
        <OptimizedImage
          className={styles.pictogram_list_item_image}
          srcImage={pictogram.imageUrl}
          size={sizeImg}
          alt={pictogram.name}
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
            {showOverlay && (
              <div className={styles.pictogram_overlay_item}>
                <Text className={styles.pictogram_overlay_item_text}>
                  {pictogram.name}
                </Text>
              </div>
            )}
          </>
        )}
      </Flex>
    </HoldablePress>
  );
}
