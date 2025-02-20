'use client';

import styles from '@/styles/modules/patient.module.scss';
import stylesPictogram from '@/styles/modules/pictogram.module.scss';
import { Empty, Flex, Typography } from 'antd';

import PictogramItem from '@/components/pictogram/PictogramItem';
import { Pictogram } from '@/models/schema/Pictogram';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

interface Props {
  pictograms: Pictogram[] | null;
}

export default function PictogramTab({ pictograms }: Props) {
  const { t } = useTranslation();

  return (
    <Flex vertical className={styles.pictogram_list} gap={30}>
      {pictograms && pictograms?.length > 0 ? (
        <>
          <Title className={styles.title_content_tab}>
            {t('Patient.detail.title_custom_pictograms')}
          </Title>
          <Flex
            className={stylesPictogram.pictogram_list_wrapper}
            gap={20}
            style={{
              flexWrap: 'wrap',
            }}
          >
            {pictograms.map((item, index) => {
              return <PictogramItem pictogram={item} key={index} />;
            })}
          </Flex>
        </>
      ) : (
        <Empty
          description={t(
            'Patient.detail.feedback.no_created_custom_pictograms',
          )}
          style={{ marginTop: 30 }}
        />
      )}
    </Flex>
  );
}
