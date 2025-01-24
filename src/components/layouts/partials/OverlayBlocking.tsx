import { Flex, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from '@/styles/modules/layouts.module.scss';
import { useOverlayStore } from '@/lib/store';

const { Text } = Typography;

const OverlayBlocking = () => {
  const { messageOverlay } = useOverlayStore();

  return (
    <Flex
      justify="center"
      align="center"
      className={styles.wrapper_overlay_blocking}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        className={styles.inner_overlay_blocking}
      >
        <Spin indicator={<LoadingOutlined spin />} size="large" />
        {messageOverlay && (
          <Text className={styles.title_overlay_blocking}>
            {messageOverlay}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default OverlayBlocking;
