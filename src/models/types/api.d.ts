export interface I_API_PAGINATE {
    total: number;
    page_count: number;
    page: number;
    page_size: number;
}

export interface API_RESPONSE<T> {
    error: string;
    statusCode: boolean;
    message: string;
    paginate?: I_API_PAGINATE;
    Data: T;
}