'use client';

import { useRouter } from '@/intl-navigation';
import { Button, Flex } from 'antd';
import { BsChevronLeft } from 'react-icons/bs';
import styles from '@/styles/modules/partials.module.scss';

interface Props {
  textLink: string;
}

export default function GoToBack({ textLink }: Props) {
  const router = useRouter();

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
        {textLink}
      </Button>
    </Flex>
  );
}
