import { API_RESPONSE, I_VALIDATION_ERRORS } from '@/models/types';
import axios, { AxiosError } from 'axios';

export interface CustomError extends Error {
  statusCode?: number;
  error?: any;
  validationErrors?: I_VALIDATION_ERRORS;
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
      validationErrors: err?.response?.data.validationErrors,
    };
  }

  throw err;
};
