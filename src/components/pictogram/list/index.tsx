'use client';

import { usePictogramColumns } from '@/components/pictogram/list/PictogramColumns';
import WrapperTable from '@/components/table/Wrappertable';
import {
  useFetchListCategoryPictogramsQuery,
  useFetchListPictogramsQuery,
} from '@/lib/queries/pictogram';
import { useFormPictogramStore } from '@/lib/store/forms/formPictogram';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space, message } from 'antd';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function PictogramsIndex() {
  const { t } = useTranslation();
  const { setCategoryList } = useFormPictogramStore();
  const [columns] = usePictogramColumns();
  const { searching, paginationTable, dispatch } = useTableStore();

  const queryCategory = useFetchListCategoryPictogramsQuery();
  const { data, isLoading, isRefetching } = useFetchListPictogramsQuery({
    paginate: {
      page: paginationTable?.page,
      size: paginationTable?.size,
    },
  });

  const loading = useMemo(
    () => !(!isLoading && !queryCategory.isLoading),
    [isLoading, queryCategory.isLoading],
  );

  useEffect(() => {
    if (!loading) {
      if (queryCategory?.data && queryCategory?.data?.data) {
        setCategoryList(queryCategory?.data.data || []);
      }
    }
  }, [loading, queryCategory?.data, setCategoryList]);

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    message.success('Processing complete!'); // TODO it's will change for message returned by api
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          cols={columns}
          data={data}
          searchable
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Pictogram.index.searchPlaceholder'),
          }}
          loading={isLoading}
          fetching={isRefetching}
        />
      </Space>
    </>
  );
}
