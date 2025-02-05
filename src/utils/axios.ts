import { API_RESPONSE } from '@/models/types';
import axios, { AxiosError } from 'axios';

export interface CustomError extends Error {
  statusCode?: number;
  error?: any;
}

export const axiosErrorHandler = (
  err: Error | AxiosError | unknown,
): API_RESPONSE<undefined> => {
  if (axios.isAxiosError(err)) {
    if (!err?.response?.data.error) {
      throw err as Error;
    }

    return {
      message: err?.response?.data.message,
      statusCode: err?.response?.data.statusCode,
      error: err?.response?.data.error,
    };
  }

  throw err;
};
