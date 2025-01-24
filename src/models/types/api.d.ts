export interface I_API_PAGINATE {
  total: number;
  page_count: number;
  page: number;
  page_size: number;
}

export interface API_RESPONSE<T> {
  error: string;
  statusCode?: boolean;
  message: string;
  paginate?: I_API_PAGINATE;
  data?: T;
}

export interface API_SINGLE_RESPONSE {
  error: boolean;
  statusCode: number;
  message: string;
}
