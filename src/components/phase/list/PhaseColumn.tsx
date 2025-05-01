import PhaseActions from '@/components/phase/list/PhaseActions';
import { SingleTEAPhase } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import PhaseRowCardMobile from '@/components/phase/list/PhaseRowCardMobile';

export const usePhaseColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<SingleTEAPhase>['columns'] = [
    {
      title: t('Phase.index.columns.name'),
      dataIndex: 'name',
      align: 'left',
      width: '280px',
    },
    {
      title: t('Phase.index.columns.description'),
      dataIndex: 'description',
      align: 'center',
      width: '350px',
    },
    {
      title: t('Phase.index.columns.scoreActivities'),
      dataIndex: 'scoreActivities',
      align: 'center',
      width: '280px',
      className: 'table-cell-center',
    },
    createActionColumn({
      customRender: (record) => <PhaseActions phase={record} />,
    }),
    createRowCardMobileColumn({
      customRender: (record) => <PhaseRowCardMobile phase={record} />,
    }),
  ];

  return [addResponsiveProperty(columns)];
};
