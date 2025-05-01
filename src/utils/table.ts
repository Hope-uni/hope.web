import { Breakpoint, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';

interface ActionColumnOptions<T> extends Partial<ColumnType<T>> {
  customRender: (record: T, index: number) => React.ReactNode;
}

const colResponsiveForLargeDesktop: Breakpoint[] = [
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
];
const colResponsiveForMobile: Breakpoint[] = ['xs'];

export const addResponsiveProperty = (
  columns: TableProps<any>['columns'],
): TableProps<any>['columns'] => {
  return columns?.map((col, index) => {
    const responsive =
      index === columns.length - 1
        ? colResponsiveForMobile
        : colResponsiveForLargeDesktop;
    return {
      ...col,
      responsive,
    };
  });
};

export const createActionColumn = <T>({
  dataIndex = 'id',
  width = '60px',
  fixed = 'right',
  align = 'center',
  className = 'td-actions',
  customRender,
  ...props
}: ActionColumnOptions<T>): ColumnType<T> => {
  return {
    title: '',
    dataIndex,
    align,
    width,
    fixed,
    className,
    onCell: () => ({
      onClick: (e) => {
        e.stopPropagation();
      },
    }),
    render: (_, record, index) => customRender(record, index),
    ...props,
  };
};

export const createRowCardMobileColumn = <T>({
  title = 'rowCardMobile',
  dataIndex = 'mobile',
  className = 'table-col-mobile',
  customRender,
  ...props
}: ActionColumnOptions<T>): ColumnType<T> => {
  return {
    title,
    dataIndex,
    className,
    onCell: () => ({
      onClick: (e) => {
        e.stopPropagation();
      },
    }),
    render: (_, record, index) => customRender(record, index),
    ...props,
  };
};
