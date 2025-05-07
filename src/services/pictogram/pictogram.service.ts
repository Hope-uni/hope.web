import { API_HOPE_PROTECTED, defaultPayload } from '@/config';
import { API } from '@/constants/ApiUrls';
import { PayloadPictogram, SinglePictogram } from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE, API_SINGLE_RESPONSE } from '@/models/types';
import { axiosErrorHandler, ParseToFormData } from '@/utils/axios';
import { valuesWithData } from '@/utils/objects';

export const ListPictogramsService = async (
  payload: API_PAYLOAD = defaultPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<SinglePictogram[]>
    >(API.Pictogram.Index, {
      params: payload.paginate,
    });

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const CreatePictogramService = async (payload: PayloadPictogram) => {
  try {
    const form = ParseToFormData(payload);

    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<SinglePictogram>
    >(API.Pictogram.Index, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const EditPictogramService = async (
  payload: PayloadPictogram,
  id: string,
) => {
  try {
    const validatePayload = valuesWithData(payload);
    const form = ParseToFormData(validatePayload);
    const response = await API_HOPE_PROTECTED.put<
      API_RESPONSE<SinglePictogram>
    >(`${API.Pictogram.Index}/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const DeletePictogramService = async (id: string) => {
  try {
    const response = await API_HOPE_PROTECTED.delete<API_SINGLE_RESPONSE>(
      `${API.Pictogram.Index}/${id}`,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
