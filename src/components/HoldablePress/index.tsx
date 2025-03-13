import {
  ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  onThresholdReached: () => void;
  onStopPress: () => void;
}

const HoldablePress = ({
  children,
  onThresholdReached,
  onStopPress,
  ...props
}: Props) => {
  const [touchDuration, setTouchDuration] = useState({
    startTime: 0,
    endTime: 0,
  });
  const touchTimer = useRef<NodeJS.Timeout | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  const handleMouseDown = () => {
    setTouchDuration({
      startTime: Date.now(),
      endTime: 0,
    });
    setIsTouching(true);
  };

  const handleMouseUp = () => {
    if (touchTimer.current) {
      clearTimeout(touchTimer.current);
    }

    setIsTouching(false);
    onStopPress();
  };

  const monitorTouchDuration = useCallback(() => {
    touchTimer.current = setTimeout(() => {
      if (isTouching) {
        const pressDuration = Date.now() - touchDuration.startTime;

        if (pressDuration >= 500) {
          onThresholdReached();
          if (touchTimer.current) {
            clearTimeout(touchTimer.current);
          }
        } else {
          monitorTouchDuration();
        }
      }
    }, 100);
  }, [isTouching, onThresholdReached, touchDuration.startTime]);

  useEffect(() => {
    if (isTouching) {
      monitorTouchDuration();
    }
  }, [isTouching, monitorTouchDuration]);

  return (
    <button
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      {...props}
    >
      {children}
    </button>
  );
};

export default HoldablePress;
