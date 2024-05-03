'use client';

import {
  Descriptions,
  DescriptionsProps,
  Divider,
  Tabs,
  TabsProps,
} from 'antd';
import { useTranslations } from 'next-intl';
import ObservationList from '../ObservationList';

interface Observation {
  text: string;
  date: string;
  user: string;
}

interface Props {
  items: DescriptionsProps['items'];
  observations: Observation[];
}

export default function RecordTab({ items, observations }: Props) {
  const t = useTranslations('_.User');

  return (
    <>
      <Descriptions
        layout="vertical"
        items={items}
        column={2}
        className="ant-descriptions_vertical"
      />
      <Divider
        dashed={true}
        style={{
          borderColor: '#626262',
          borderStyle: 'dashed',
          borderWidth: '2px 0 0',
        }}
      />
      <ObservationList observations={observations} />
    </>
  );
}
