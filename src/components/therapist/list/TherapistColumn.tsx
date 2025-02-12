import { UnassignedTag } from '@/components/common';
import PopupActions from '@/components/table/PopupActions';
import TherapistRowCardMobile from '@/components/therapist/list/TherapistRowCardMobile';
import { ListTherapistResponse } from '@/models/schema';
import { addResponsiveProperty } from '@/utils/table';
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

  const columns: TableProps<ListTherapistResponse>['columns'] = [
    {
      title: t('Therapist.index.columns.name'),
      dataIndex: 'fullName',
      align: 'left',
      sorter: (a: ListTherapistResponse, b: ListTherapistResponse) =>
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
      render: (_, { patientsInCharge }) => {
        if (!!(patientsInCharge && patientsInCharge > 0)) {
          return <span>{patientsInCharge}</span>;
        }

        return <UnassignedTag />;
      },
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
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, therapist) => {
        return <TherapistRowCardMobile therapist={therapist} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
