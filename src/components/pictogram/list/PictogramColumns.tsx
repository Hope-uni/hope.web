import { UnassignedTag } from '@/components/common';
import { SinglePictogram } from '@/models/schema';
import { addResponsiveProperty } from '@/utils/table';
import { Image, TableProps, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import PictogramActions from './PictogramActions';
import PictogramRowCardMobile from './PictogramRowCardMobile';

export const usePictogramColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<SinglePictogram>['columns'] = [
    {
      title: t('Pictogram.index.columns.image'),
      dataIndex: 'imageUrl',
      align: 'left',
      render: (_, { name, imageUrl }) => (
        <Image src={String(imageUrl)} width={60} height={60} alt={name} />
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
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, pictogram) => {
        return <PictogramActions pictogram={pictogram} />;
      },
    },
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, pictogram) => {
        return <PictogramRowCardMobile pictogram={pictogram} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
