import { useState, useEffect } from 'react';

const useCapsLockDetector = () => {
  const [capsLockOn, setCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setCapsLockOn(event.getModifierState('CapsLock'));
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return capsLockOn;
};

export default useCapsLockDetector;
