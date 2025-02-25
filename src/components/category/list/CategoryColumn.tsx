import CategoryActions from '@/components/category/list/CategoryActions';
import CategoryRowCardMobile from '@/components/category/list/CategoryRowCardMobile';
import { CategoryPictogram } from '@/models/schema';
import { addResponsiveProperty } from '@/utils/table';
import { Image, TableProps } from 'antd';
import { useTranslation } from 'react-i18next';

export const useCategoryColumns = () => {
  const { t } = useTranslation();

  const columns: TableProps<CategoryPictogram>['columns'] = [
    {
      title: t('Category.index.columns.icon'),
      dataIndex: 'name',
      align: 'left',
      width: '150px',
      render: (_, { name, icon }) => (
        <Image src={String(icon)} width={60} height={60} alt={name} />
      ),
    },
    {
      title: t('Category.index.columns.name'),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'center',
      width: '60px',
      render: (_, category) => {
        return <CategoryActions category={category} />;
      },
    },
    {
      title: 'rowCardMobile',
      dataIndex: 'mobile',
      className: 'table-col-mobile',
      render: (_, category) => {
        return <CategoryRowCardMobile category={category} />;
      },
    },
  ];

  return [addResponsiveProperty(columns)];
};
