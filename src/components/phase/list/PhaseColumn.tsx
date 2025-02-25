import PhaseActions from '@/components/phase/list/PhaseActions';
import { TEAPhase } from '@/models/schema';
import { addResponsiveProperty } from '@/utils/table';
import { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import PhaseRowCardMobile from '@/components/phase/list/PhaseRowCardMobile';

export const usePhaseColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<TEAPhase>['columns'] = [
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
    },
    {
      title: t('Phase.index.columns.scoreActivities'),
      dataIndex: 'scoreActivities',
      align: 'center',
      width: '280px',
      className: 'table-cell-center',
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, phase) => {
        return <PhaseActions phase={phase} />;
      },
    },
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, phase) => {
        return <PhaseRowCardMobile phase={phase} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
