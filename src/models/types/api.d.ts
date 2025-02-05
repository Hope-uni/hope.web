export interface I_API_PAGINATE {
  total: number;
  page_count: number;
  page: number;
  page_size: number;
}

export interface I_VALIDATION_ERRORS {
  [key as string]: string;
}

export interface API_RESPONSE<T> {
  error: boolean;
  statusCode?: number;
  message: string;
  validationErrors?: I_VALIDATION_ERRORS;
  paginate?: I_API_PAGINATE;
  data?: T;
}

export interface API_SINGLE_RESPONSE {
  error: boolean;
  statusCode?: number;
  message: string;
  validationErrors?: I_VALIDATION_ERRORS;
}

export interface PAGINATE_PAYLOAD {
  page: number;
  size: number;
}

export interface API_PAYLOAD<T = unknown> {
  body?: T;
  paginate: PAGINATE_PAYLOAD | undefined;
}
