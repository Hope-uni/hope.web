import { API_RESPONSE } from '@/models/types';
import axios, { AxiosError } from 'axios';

export const axiosErrorHandler = (
  err: Error | AxiosError | unknown,
): API_RESPONSE<undefined> => {
  if (axios.isAxiosError(err)) {
    return {
      error: err?.response?.data.error,
      statusCode: err?.response?.data.statusCode,
      message: err?.response?.data.message,
    };
  }

  throw err;
};
