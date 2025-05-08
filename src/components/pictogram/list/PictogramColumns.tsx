import { UnassignedTag } from '@/components/common';
import OptimizedImage from '@/components/common/OptimizedImage';
import { SinglePictogram } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
import { TableProps, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import PictogramActions from './PictogramActions';
import PictogramRowCardMobile from './PictogramRowCardMobile';

interface OptionsArgs {
  showActions?: boolean;
}

export const usePictogramColumns = (options?: OptionsArgs) => {
  const { showActions = true } = options ?? {};

  const { t } = useTranslation();

  const columns: TableProps<SinglePictogram>['columns'] = [
    {
      title: t('Pictogram.index.columns.image'),
      dataIndex: 'imageUrl',
      align: 'left',
      render: (_, { name, imageUrl }) => (
        <OptimizedImage srcImage={imageUrl} size={60} alt={name} />
      ),
    },
    {
      title: t('Pictogram.index.columns.name'),
      dataIndex: 'username',
      align: 'center',
      render: (_, { name }) => <span>{name}</span>,
    },
    {
      title: t('Pictogram.index.columns.category'),
      dataIndex: 'category',
      align: 'center',
      width: '280px',
      className: 'table-cell-center',
      render: (_, { category }) => {
        if (!category?.name) {
          return <UnassignedTag />;
        }

        return <Tag className="tag-role">{category.name}</Tag>;
      },
    },
  ];

  if (showActions) {
    columns.push(
      createActionColumn({
        customRender: (record) => <PictogramActions pictogram={record} />,
      }),
    );
  }

  columns.push(
    createRowCardMobileColumn({
      customRender: (record) => (
        <PictogramRowCardMobile pictogram={record} showActions={showActions} />
      ),
    }),
  );

  return [addResponsiveProperty(columns)];
};
