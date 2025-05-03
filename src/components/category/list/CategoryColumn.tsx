import CategoryActions from '@/components/category/list/CategoryActions';
import CategoryRowCardMobile from '@/components/category/list/CategoryRowCardMobile';
import { CategoryPictogram } from '@/models/schema';
import {
  addResponsiveProperty,
  createActionColumn,
  createRowCardMobileColumn,
} from '@/utils/table';
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
    createActionColumn({
      customRender: (record) => <CategoryActions category={record} />,
    }),
    createRowCardMobileColumn({
      customRender: (record) => <CategoryRowCardMobile category={record} />,
    }),
  ];

  return [addResponsiveProperty(columns)];
};
