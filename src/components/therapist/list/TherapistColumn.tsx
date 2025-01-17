import PopupActions from '@/components/table/PopupActions';
import { Therapist } from '@/models/schema';
import { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useTherapistColumns = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (id: number) => {
      router.push(`/admin/users/edit/${id}`);
    },
    [router],
  );

  const columns: TableProps<Therapist>['columns'] = [
    {
      title: t('Therapist.index.columns.name'),
      dataIndex: 'fullName',
      align: 'left',
      sorter: (a: Therapist, b: Therapist) =>
        a.fullName.localeCompare(b.fullName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: t('Therapist.index.columns.email'),
      dataIndex: 'email',
      align: 'center',
      width: '280px',
    },
    {
      title: t('Therapist.index.columns.phone'),
      dataIndex: 'phoneNumber',
      align: 'center',
      width: '280px',
    },
    {
      title: t('Therapist.index.columns.patientsInCharge'),
      dataIndex: 'patientsInCharge',
      align: 'center',
      width: '250px',
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, { id }) => {
        return (
          <PopupActions
            id={id}
            actions={['show', 'edit', 'delete']}
            route="therapists"
            onEdit={() => handleEdit(id)}
          />
        );
      },
    },
  ];

  return [columns];
};
