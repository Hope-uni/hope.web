import { API_HOPE_PROTECTED, defaultPayload } from '@/config';
import { API } from '@/constants/ApiUrls';
import { SinglePictogram } from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE, API_SINGLE_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';

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
