import { API_HOPE_PROTECTED, defaultPayload } from '@/config';
import { API } from '@/constants/ApiUrls';
import { PayloadCategory, CategoryPictogram } from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE, API_SINGLE_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';
import { valuesWithData } from '@/utils/objects';

export const ListCategoryPictogramService = async (
  payload: API_PAYLOAD = defaultPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<CategoryPictogram[]>
    >(API.CategoryPictogram.Index, {
      params: payload.paginate,
    });

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const CreateCategoryPictogramService = async (
  payload: PayloadCategory,
) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<CategoryPictogram>
    >(API.CategoryPictogram.Index, {
      ...payload,
    });

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const EditCategoryPictogramService = async (
  payload: PayloadCategory,
  id: string,
) => {
  try {
    const validatePayload = valuesWithData(payload);
    const response = await API_HOPE_PROTECTED.put<
      API_RESPONSE<CategoryPictogram>
    >(`${API.CategoryPictogram.Index}/${id}`, {
      ...validatePayload,
    });

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const DeleteCategoryPictogramService = async (id: string) => {
  try {
    const response = await API_HOPE_PROTECTED.delete<API_SINGLE_RESPONSE>(
      `${API.CategoryPictogram.Index}/${id}`,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
