import React, { useCallback } from 'react';
import { TableProps } from 'antd';
import { Therapist } from '@/models/schema';
import PopupActions from '@/components/table/PopupActions';
import { useRouter } from '@/intl-navigation';
import { useTranslations } from 'next-intl';

export const useTherapistColumns = () => {
  const router = useRouter();
  const t = useTranslations('_.Therapist.index');

  const handleEdit = useCallback(
    (id: number) => {
      router.push(`/admin/users/edit/${id}`);
    },
    [router],
  );

  const columns: TableProps<Therapist>['columns'] = [
    {
      title: t('columns.name'),
      dataIndex: 'fullName',
      align: 'left',
      sorter: (a: Therapist, b: Therapist) =>
        a.fullName.localeCompare(b.fullName),
      sortDirections: [] || ['descend', 'ascend'],
    },
    {
      title: t('columns.email'),
      dataIndex: 'email',
      align: 'center',
      width: '280px',
    },
    {
      title: t('columns.phone'),
      dataIndex: 'phoneNumber',
      align: 'center',
      width: '280px',
    },
    {
      title: t('columns.patientsInCharge'),
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
