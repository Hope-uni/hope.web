'use client';

import { Observation } from '@/models/schema';
import styles from '@/styles/modules/patient.module.scss';
import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useTranslation } from 'react-i18next';

dayjs.locale('es');

const { Text } = Typography;

interface Props {
  observations: Observation[];
}

export default function ObservationList({ observations }: Props) {
  const { t } = useTranslation();
  return (
    <Flex vertical gap={15} className={styles.observation_list}>
      <Flex vertical gap={15} className={styles.observation_list_wrapper}>
        {observations.map((item, index) => {
          return (
            <Flex vertical key={index} className={styles.observation_list_item}>
              <Text className={styles.observation_list_caption}>
                {dayjs(item.createAt).format('DD MMMM, YYYY')} - @
                {item.username}
              </Text>
              <Text className={styles.observation_list_content}>
                {item.description}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
