import { ReactNode } from 'react';
import { API_RESPONSE } from './api';

export enum E_ActionKeyTable {
  SET_SELECTED_ROW = 'SET_SELECTED_ROW',
  SET_HAS_SELECTED = 'SET_HAS_SELECTED',
  CLEAR_SELECTED = 'CLEAR_SELECTED',
  SET_HANDLE_MODAL = 'SET_HANDLE_MODAL',
  SET_MODAL_DELETE = 'SET_MODAL_DELETE',
  SET_MESSAGE = 'SET_MESSAGE',
  SET_MESSAGE_SCROLL = 'SET_MESSAGE_SCROLL',
  CLEAR_MESSAGE = 'CLEAR_MESSAGE',
  SET_DATA_TABLE = 'SET_DATA_TABLE',
  SET_SEARCHING = 'SET_SEARCHING',
  SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
  SET_TOTAL_RESULTS = 'SET_TOTAL_RESULTS',
  RESET_SEARCH = 'RESET_SEARCH',
  SET_PAGINATION = 'SET_PAGINATION',
  RESET_PAGINATION = 'RESET_PAGINATION',
}

export interface I_TablePagination {
  totalItems?: number;
  totalPages: number;
  currentPage?: number;
  totalData?: number;
  page: number;
  size: number;
}

export interface I_TableState<> {
  rowSelected: any;
  hasSelected: boolean;
  handleModal: boolean;
  modalDelete: boolean;
  message: any;
  dataTable: any;
  searching: boolean;
  searchResult: any;
  totalResults: string;
  paginationTable: I_TablePagination;
}

export interface I_ActionTable {
  type: E_ActionKeyTable;
  payload?: any;
}

export enum E_FilterSearchType {
  'DATE_RANGE' = 'DATE_RANGE',
  'SELECT' = 'SELECT',
  'TEXT' = 'TEXT',
}

export type FilterOptionType = {
  value: string;
  label: string;
  placeholder: string | undefined;
  type?: E_FilterSearchType;
  options?: any[];
};

export type SearchValueType = {
  value: any;
  filter: any;
  inputType: E_FilterSearchType;
  selectOptions?: any[];
};

export type SearchPropsType = {
  placeholder?: string;
  searching: boolean;
  filterable?: boolean;
  filterOptions?: FilterOptionType[] | [];
  minWidthSelect?: number;
  handleDisable?: any;
  onSearch: any;
  onClear?: () => void;
};

export type TablePropsType = {
  btnExtra?: boolean;
  pagination?: boolean;
  customPagination?: boolean;
  pageSize?: number;
  typeSelection?: string;
  selection?: any;
  cols: TableProps<any>['columns'];
  data?: API_RESPONSE<any> | any; // TODO Replacing this any requires a refactor
  showHeader?: boolean;
  showTitle?: boolean;
  searchable?: boolean;
  stylesWrap?: any;
  id?: string;
  loading?: boolean;
  fetching?: boolean;
  scroll?: boolean;
  scrollHeight?: string | number;
  searchProps?: SearchPropsType;
};

export type ActionType =
  | 'show'
  | 'edit'
  | 'assign_patient'
  | 'assign'
  | 'delete';

export interface ActionTableOptionsType {
  label: string;
  icon: IconType;
  key: string;
  actionType: ActionType;
  colorClassName: string;
}

export type SizeChangerOptionsType = {
  value: string;
  label: string;
};

export interface I_HopeTableConfig {
  sizeChangerOptions: SizeChangerOptionsType[];
  actionTableOptions: ActionTableOptionsType[];
}
