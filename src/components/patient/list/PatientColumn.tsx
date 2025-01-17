import PopupActions from '@/components/table/PopupActions';
import { Patient } from '@/models/schema';
import { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const usePatientColumns = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (id: number) => {
      router.push(`/patients/edit/${id}`);
    },
    [router],
  );

  const columns: TableProps<Patient>['columns'] = [
    {
      title: t('Patient.index.columns.name'),
      dataIndex: 'fullName',
      align: 'left',
    },
    {
      title: t('Patient.index.columns.age'),
      dataIndex: 'age',
      align: 'center',
      width: '200px',
    },
    {
      title: t('Patient.index.columns.grade'),
      dataIndex: 'teaGrade',
      align: 'center',
      width: '200px',
    },
    {
      title: t('Patient.index.columns.phase'),
      dataIndex: 'teaPhase',
      align: 'center',
      width: '200px',
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
  ];

  return [columns];
};
