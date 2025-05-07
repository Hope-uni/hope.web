import { API_RESPONSE, I_VALIDATION_ERRORS } from '@/models/types';
import { UploadFile } from 'antd';
import axios, { AxiosError } from 'axios';

const INPUT_FILE_KEY = 'imageFile';

export interface CustomError extends Error {
  statusCode?: number;
  error?: any;
  validationErrors?: I_VALIDATION_ERRORS;
  data?: any;
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
      data: err?.response?.data.data,
    };
  }

  throw err;
};

export const ParseToFormData = (payload: Record<string, unknown>): FormData => {
  try {
    const form = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      if (key === INPUT_FILE_KEY) {
        const fileList = value as UploadFile[];
        const firstFile = fileList[0];
        if (firstFile?.originFileObj) {
          form.append(key, firstFile.originFileObj as Blob);
        }
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          form.append(`${String(key)}[]`, item.toString());
        });
        return;
      }

      if (value instanceof Blob || value instanceof File) {
        form.append(String(key), value);
        return;
      }

      form.append(String(key), value.toString());
    });

    return form;
  } catch (error) {
    throw error;
  }
};
