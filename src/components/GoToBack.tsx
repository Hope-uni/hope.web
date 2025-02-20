'use client';

import styles from '@/styles/modules/partials.module.scss';
import { Button, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { BsChevronLeft } from 'react-icons/bs';

interface Props {
  onGoToBack?: () => void;
}

export default function GoToBack({ onGoToBack }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleGoToBack = () => {
    if (onGoToBack) {
      onGoToBack();
      return;
    }
    router.back();
  };

  return (
    <Flex className={styles.wrapper_go_to_back}>
      <Button
        className={styles.go_to_back}
        type="link"
        onClick={handleGoToBack}
      >
        <BsChevronLeft size="16px" />
        {t('partials.go_back_to_list')}
      </Button>
    </Flex>
  );
}
