import { UnassignedTag } from '@/components/common';
import PatientRowCardMobile from '@/components/patient/list/PatientRowCardMobile';
import PopupActions from '@/components/table/PopupActions';
import { ListPatientResponse } from '@/models/schema';
import { addResponsiveProperty } from '@/utils/table';
import { TableProps, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const usePatientColumns = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (id: number) => {
      router.push(`/admin/users/edit/${id}`);
    },
    [router],
  );

  const columns: TableProps<ListPatientResponse>['columns'] = [
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
        if (!teaDegree) {
          return <UnassignedTag />;
        }
        return <Tag className="tag-degree">{teaDegree}</Tag>;
      },
    },
    {
      title: t('Patient.index.columns.phase'),
      dataIndex: 'phase',
      align: 'center',
      width: '350px',
      render: (_, { phase }) => {
        if (!phase) {
          return <UnassignedTag />;
        }
        return <span>{phase}</span>;
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
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      className: 'td-actions',
      render: (_, { id }) => {
        return (
          <PopupActions
            id={id}
            actions={['show', 'edit', 'delete']}
            route="patients"
            onEdit={() => handleEdit(id)}
          />
        );
      },
    },
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, patient) => {
        return <PatientRowCardMobile patient={patient} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
