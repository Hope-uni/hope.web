'use client';

import { useRouter } from '@/intl-navigation';
import { Button, Flex } from 'antd';
import { useTranslations } from 'next-intl';
import { BsChevronLeft } from 'react-icons/bs';
import styles from '@/styles/modules/partials.module.scss';

export default function GoToBack() {
  const router = useRouter();
  const t = useTranslations('_.partials');

  const handleGoToBack = () => {
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
        {t('go_back_to_list')}
      </Button>
    </Flex>
  );
}
