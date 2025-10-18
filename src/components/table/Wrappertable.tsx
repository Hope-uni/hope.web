/* eslint-disable react-hooks/exhaustive-deps */
import HeaderTable from '@/components/table/HeaderTable';
import { MODE_VIEW_DISPLAY } from '@/components/table/helpers';
import WrapperSkeleton from '@/components/table/skeleton/WrapperSkeleton';
import ViewGrid from '@/components/table/views/ViewGrid';
import ViewTable from '@/components/table/views/ViewTable';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable, TablePropsType } from '@/models/types/Table.d';
import { Pagination } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';

function WrapperTable({
  btnExtra = false,
  pagination = true,
  typeSelection = 'radio',
  selection,
  cols,
  data = undefined,
  showHeader = true,
  showTitle = true,
  searchable = false,
  stylesWrap,
  id,
  loading,
  fetching,
  scroll = false,
  scrollHeight,
  searchProps,
  stripped = true,
  viewDisplayProps = {
    defaultView: MODE_VIEW_DISPLAY.TABLE,
    allowViews: [MODE_VIEW_DISPLAY.TABLE, MODE_VIEW_DISPLAY.GRID],
    showViewToggle: false,
  },
  onRowClick,
}: TablePropsType) {
  const { paginationTable, lastIdMounted, viewDisplay, dispatch } =
    useTableStore();

  useEffect(() => {
    dispatch({ type: E_ActionKeyTable.SET_SEARCH_RESULT, payload: [] });
    dispatch({ type: E_ActionKeyTable.SET_SEARCHING, payload: false });
    dispatch({
      type: E_ActionKeyTable.SET_VIEW_DISPLAY,
      payload: viewDisplayProps?.defaultView || MODE_VIEW_DISPLAY.TABLE,
    });

    return () => {
      dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
      dispatch({ type: E_ActionKeyTable.CLEAR_MESSAGE });
      dispatch({ type: E_ActionKeyTable.RESET_SEARCH });
    };
  }, []);

  const dataTable = useMemo(() => {
    return Array.isArray(data?.data) || Array.isArray(data)
      ? data?.data || data
      : [];
  }, [data]);

  const paginationFromAPI = useMemo(() => {
    return data?.paginate && data?.paginate?.total;
  }, [data?.paginate]);

  useEffect(() => {
    dispatch({ type: E_ActionKeyTable.SET_LAST_ID_MOUNTED, payload: id });

    if (lastIdMounted !== id) {
      dispatch({ type: E_ActionKeyTable.RESET_PAGINATION });
    }
  }, [id]);

  useEffect(() => {
    const totalResults = paginationFromAPI
      ? data?.paginate?.total
      : data?.data?.length;

    if (data?.data?.length > 0 && paginationTable?.totalData !== totalResults) {
      const paginationData = !paginationFromAPI
        ? {
            totalPages: 0,
            page: 1,
            totalData: totalResults,
          }
        : {
            totalPages: data?.paginate?.page_count ?? 0,
            page: data?.paginate?.page,
            size: data?.paginate?.size,
            totalData: totalResults,
          };

      dispatch({
        type: E_ActionKeyTable.SET_PAGINATION,
        payload: {
          ...paginationTable,
          ...paginationData,
        },
      });
    }
  }, [data?.paginate, data?.data?.length, paginationTable, dispatch]);

  const handleChangePagination = useCallback(
    (page: number) => {
      dispatch({
        type: E_ActionKeyTable.SET_PAGINATION,
        payload: {
          ...paginationTable,
          page: page,
        },
      });
    },
    [paginationTable, dispatch],
  );

  const paginationDataTable = useMemo(() => {
    return {
      showSizeChanger: false,
      pageSize: paginationTable?.size,
      total: paginationTable?.totalData,
      current: paginationTable?.page,
      showTotal: undefined,
      onChange: handleChangePagination,
    };
  }, [paginationTable, handleChangePagination]);

  return (
    <div className="view-display-wrapper" style={{ ...stylesWrap }}>
      {!loading && !fetching ? (
        <>
          {showTitle && (
            <HeaderTable
              searchProps={searchProps}
              searchable={searchable}
              showSizeChanger={pagination}
              showViewToggle={viewDisplayProps.showViewToggle}
            />
          )}
          {viewDisplay === MODE_VIEW_DISPLAY.TABLE && (
            <ViewTable
              id={id}
              source={dataTable}
              cols={cols}
              scroll={scroll}
              stripped={stripped}
              pagination={false}
              showHeader={showHeader}
              onRowClick={onRowClick}
            />
          )}
          {viewDisplay === MODE_VIEW_DISPLAY.GRID && (
            <ViewGrid
              source={dataTable}
              grid={viewDisplayProps.grid}
              renderItemViewGrid={viewDisplayProps.renderItemViewGrid}
            />
          )}
          {pagination && (
            <Pagination
              {...paginationDataTable}
              align="end"
              className="ant-pagination ant-table-pagination ant-table-pagination-right"
            />
          )}
        </>
      ) : (
        <>
          <WrapperSkeleton
            fetching={fetching}
            selection={selection}
            columns={cols} //TODO This implementation needs improvement
          />
        </>
      )}
    </div>
  );
}

export default WrapperTable;
