import { UploadFile } from 'antd';

const INPUT_FILE_KEY = 'imageFile';

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

      if (value instanceof Blob) {
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
