import styles from '@/styles/modules/layouts.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const OverlaySession = () => {
  return (
    <Flex
      justify="center"
      align="center"
      className={styles.wrapper_overlay_session}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        className={styles.inner_overlay_session}
      >
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </Flex>
    </Flex>
  );
};

export default OverlaySession;
