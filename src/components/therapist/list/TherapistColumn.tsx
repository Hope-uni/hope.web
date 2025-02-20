import { UnassignedTag } from '@/components/common';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import TherapistRowCardMobile from '@/components/therapist/list/TherapistRowCardMobile';
import { SingleTutorTherapist } from '@/models/schema';
import { addResponsiveProperty } from '@/utils/table';
import { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';

export const useTherapistColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<SingleTutorTherapist>['columns'] = [
    {
      title: t('Therapist.index.columns.name'),
      dataIndex: 'fullName',
      align: 'left',
      sorter: (a: SingleTutorTherapist, b: SingleTutorTherapist) =>
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
      render: (_, { childrenInCharge }) => {
        if (!!(childrenInCharge && childrenInCharge > 0)) {
          return <span>{childrenInCharge}</span>;
        }

        return <UnassignedTag />;
      },
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, therapist) => {
        return <TherapistActions therapist={therapist} />;
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
