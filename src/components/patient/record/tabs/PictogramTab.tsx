'use client';

import styles from '@/styles/modules/patient.module.scss';
import { Flex, Typography } from 'antd';
import { useTranslations } from 'next-intl';

import PictogramItem from '@/components/pictogram/PictogramItem';
import { Pictogram } from '@/models/schema/Pictogram';

const { Title } = Typography;

interface Props {
  pictograms: Pictogram[];
}

export default function PictogramTab({ pictograms }: Props) {
  const t = useTranslations('_.Patient');

  return (
    <Flex vertical className={styles.pictogram_list} gap={30}>
      <Title className={styles.title_content_tab}>
        {t('detail.title_custom_pictograms')}
      </Title>
      <Flex
        className={styles.activity_list_wrapper}
        gap={20}
        style={{
          flexWrap: 'wrap',
        }}
      >
        {pictograms.map((item, index) => {
          return <PictogramItem pictogram={item} key={index} />;
        })}
      </Flex>
    </Flex>
  );
}
