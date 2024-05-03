'use client';

import React from 'react';
import { Flex, Typography } from 'antd';
import styles from '@/styles/modules/patient.module.scss';
import { useTranslations } from 'next-intl';

const { Title, Text } = Typography;

interface Observation {
  text: string;
  date: string;
  user: string;
}

interface Props {
  observations: Observation[];
}

export default function ObservationList({ observations }: Props) {
  const t = useTranslations('_.Patient.detail');
  return (
    <Flex vertical gap={15} className={styles.observation_list}>
      <Title className={styles.title_content_tab}>
        {t('title_observation')}
      </Title>
      <Flex vertical gap={15} className={styles.observation_list_wrapper}>
        {observations.map((item, index) => {
          return (
            <Flex vertical key={index} className={styles.observation_list_item}>
              <Text className={styles.observation_list_caption}>
                {item.date} - @{item.user}
              </Text>
              <Text className={styles.observation_list_content}>
                {item.text}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
