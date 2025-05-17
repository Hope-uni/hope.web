/* eslint-disable react-hooks/exhaustive-deps */
import SkeletonTable from '@/components/table/SkeletonTable';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable, TablePropsType } from '@/models/types/Table.d';
import { Grid, Table } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';
import HeaderTable from './HeaderTable';

const { useBreakpoint } = Grid;

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
  onRowClick,
}: TablePropsType) {
  const screens = useBreakpoint();
  const { paginationTable, lastIdMounted, dispatch } = useTableStore();

  const paginationFromAPI = useMemo(() => {
    return data?.paginate && data?.paginate?.total;
  }, [data?.paginate]);

  useEffect(() => {
    dispatch({ type: E_ActionKeyTable.SET_LAST_ID_MOUNTED, payload: id });
  }, [id]);

  useEffect(() => {
    dispatch({ type: E_ActionKeyTable.SET_SEARCH_RESULT, payload: [] });
    dispatch({ type: E_ActionKeyTable.SET_SEARCHING, payload: false });

    return () => {
      dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
      dispatch({ type: E_ActionKeyTable.CLEAR_MESSAGE });
      dispatch({ type: E_ActionKeyTable.RESET_SEARCH });
    };
  }, []);

  useEffect(() => {
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

  const handleOnRow = (record: any, rowIndex: number | undefined) => {
    if (onRowClick) {
      return {
        onClick: () => onRowClick(record, rowIndex),
      };
    }
    return {};
  };

  return (
    <div style={{ ...stylesWrap }}>
      {!loading && !fetching ? (
        <>
          <Table
            id={id}
            className={`customTable ${stripped ? 'table-stripped' : ''} ${onRowClick ? 'table-row-clickable' : ''}`}
            columns={cols}
            dataSource={
              Array.isArray(data?.data) || Array.isArray(data)
                ? data?.data || data
                : []
            }
            scroll={
              screens.sm && scroll
                ? {
                    x: 'max-content',
                    y: scrollHeight ?? undefined,
                  }
                : undefined
            }
            pagination={pagination ? paginationDataTable : false}
            showHeader={showHeader}
            tableLayout="fixed"
            title={() =>
              showTitle ? (
                <HeaderTable
                  searchProps={searchProps}
                  searchable={searchable}
                />
              ) : null
            }
            bordered={false}
            rowKey="id"
            rowHoverable={Boolean(onRowClick)}
            onRow={handleOnRow}
          />
        </>
      ) : (
        <SkeletonTable
          size={paginationTable.size}
          colSpan={cols ? (selection ? cols.length + 1 : cols.length) : 1}
          fetching={!loading && fetching}
          columns={cols} //TODO This implementation needs improvement
        />
      )}
    </div>
  );
}

export default WrapperTable;
