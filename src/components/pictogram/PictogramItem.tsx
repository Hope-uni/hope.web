'use client';

import { ImageConfig } from '@/constants';
import { SinglePictogramWithOutCategory } from '@/models/schema/Pictogram';
import styles from '@/styles/modules/pictogram.module.scss';
import { Flex, Typography } from 'antd';
import Image from 'next/image';
import {
  CSSProperties,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import HoldablePress from '@/components/HoldablePress';
import { validateDeviceUserIsMobile } from '@/constants/rules';

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
  const [currentSrc, setCurrentSrc] = useState(pictogram.imageUrl);

  useEffect(() => {
    setCurrentSrc(pictogram.imageUrl);
  }, [pictogram.imageUrl]);

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
        <Image
          className={styles.pictogram_list_item_image}
          src={currentSrc}
          width={sizeImg}
          height={sizeImg}
          alt={pictogram.name}
          objectFit="fill"
          onError={() => {
            setCurrentSrc(ImageConfig.defaultPlaceholder);
          }}
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
