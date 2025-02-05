import { Breakpoint, TableProps } from 'antd';

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
