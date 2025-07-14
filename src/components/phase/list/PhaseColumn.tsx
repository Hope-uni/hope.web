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

interface OptionsArgs {
  showActions?: boolean;
}

export const usePhaseColumns = (options?: OptionsArgs) => {
  const { showActions = true } = options ?? {};

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
      align: 'left',
      width: '350px',
    },
    {
      title: t('Phase.index.columns.scoreActivities'),
      dataIndex: 'scoreActivities',
      align: 'center',
      width: '280px',
      className: 'table-cell-center',
    },
  ];

  if (showActions) {
    columns.push(
      createActionColumn({
        customRender: (record) => <PhaseActions phase={record} />,
      }),
    );
  }

  columns.push(
    createRowCardMobileColumn({
      customRender: (record) => (
        <PhaseRowCardMobile phase={record} showActions={showActions} />
      ),
    }),
  );

  return [addResponsiveProperty(columns)];
};
