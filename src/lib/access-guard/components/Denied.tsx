import styles from '@/styles/modules/partials.module.scss';
import { Result, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function Denied() {
  return (
    <Result
      className={styles.wrapper_denied}
      status="403"
      title={
        <Title level={1} className={styles.title}>
          403
        </Title>
      }
      subTitle={
        //TODO luego se aplicará intl
        <Paragraph className={styles.subTitle}>
          Lo siento, no tienes acceso a esta pantalla
        </Paragraph>
      }
    />
  );
}
