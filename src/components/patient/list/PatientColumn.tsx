import { UnassignedTag } from '@/components/common';
import PatientActions from '@/components/patient/list/PatientActions';
import PatientRowCardMobile from '@/components/patient/list/PatientRowCardMobile';
import { SinglePatient } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { TableProps, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

interface OptionsArgs {
  showActions?: boolean;
}

export const usePatientColumns = (options?: OptionsArgs) => {
  const { showActions = true } = options ?? {};

  const { t } = useTranslation();

  const columns: TableProps<SinglePatient>['columns'] = [
    {
      title: t('Patient.index.columns.name'),
      dataIndex: 'fullName',
      align: 'left',
    },
    {
      title: t('Patient.index.columns.age'),
      dataIndex: 'age',
      align: 'center',
      width: '100px',
      render: (_, { age }) => (
        <span>
          {t('Patient.index.columns.years_old', {
            age,
          })}
        </span>
      ),
    },
    {
      title: t('Patient.index.columns.grade'),
      dataIndex: 'teaDegree',
      align: 'center',
      width: '150px',
      render: (_, { teaDegree }) => {
        if (!teaDegree?.id) {
          return <UnassignedTag />;
        }
        return <Tag className="tag-degree">{teaDegree.name}</Tag>;
      },
    },
    {
      title: t('Patient.index.columns.phase'),
      dataIndex: 'phase',
      align: 'center',
      width: '350px',
      render: (_, { currentPhase }) => {
        if (!currentPhase.id) {
          return <UnassignedTag />;
        }
        return <span>{currentPhase.name}</span>;
      },
    },
    {
      title: t('Patient.index.columns.achievements'),
      dataIndex: 'achievementCount',
      align: 'center',
      width: '80px',
      render: (_, { achievementCount }) => {
        return <span>{achievementCount || 0}</span>;
      },
    },
  ];

  if (showActions) {
    columns.push(
      createActionColumn({
        customRender: (record) => <PatientActions patient={record} />,
      }),
    );
  }

  columns.push(
    createRowCardMobileColumn({
      customRender: (record) => (
        <PatientRowCardMobile patient={record} showActions={showActions} />
      ),
    }),
  );

  return [addResponsiveProperty(columns)];
};
