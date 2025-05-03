import { UnassignedTag } from '@/components/common';
import TherapistActions from '@/components/therapist/list/TherapistActions';
import TherapistRowCardMobile from '@/components/therapist/list/TherapistRowCardMobile';
import { SingleTutorTherapist } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { TableProps } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useTherapistColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<SingleTutorTherapist>['columns'] = useMemo(
    () => [
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
      createActionColumn({
        customRender: (record) => <TherapistActions therapist={record} />,
      }),
      createRowCardMobileColumn({
        customRender: (record) => <TherapistRowCardMobile therapist={record} />,
      }),
    ],
    [t],
  );

  return [addResponsiveProperty(columns)];
};
