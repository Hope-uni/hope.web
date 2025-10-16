'use client';

import { useCategoryColumns } from '@/components/category/list/CategoryColumn';
import CategoryGridCard from '@/components/category/list/CategoryGridCard';
import WrapperTable from '@/components/table/Wrappertable';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { useFetchListCategoryPictogramsQuery } from '@/lib/queries/pictogram';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function CategoryIndex() {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const [columns] = useCategoryColumns();
  const { searching, paginationTable, dispatch } = useTableStore();
  const { data, isLoading, isRefetching } = useFetchListCategoryPictogramsQuery(
    {
      paginate: {
        page: paginationTable?.page,
        size: paginationTable?.size,
      },
    },
  );

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    openNotification.success({
      description: 'Processing complete!',
    }); // TODO it's will change for message returned by api
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          id="category-table"
          cols={columns}
          data={data}
          searchable={false}
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Category.index.searchPlaceholder'),
          }}
          viewDisplayProps={{
            defaultView: 'grid',
            grid: {
              xxl: 6,
            },
            showViewToggle: true,
            renderItemViewGrid: (category) => (
              <CategoryGridCard category={category} />
            ),
          }}
          loading={isLoading}
          fetching={isRefetching}
          scroll
        />
      </Space>
    </>
  );
}
