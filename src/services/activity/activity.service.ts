import { API_HOPE_PROTECTED, defaultPayload } from '@/config';
import { API } from '@/constants/ApiUrls';
import { DetailActivity, SingleActivity } from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE, API_SINGLE_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';

export const ListActivitiesService = async (
  payload: API_PAYLOAD = defaultPayload,
) => {
  try {
    const response = await API_HOPE_PROTECTED.get<
      API_RESPONSE<SingleActivity[]>
    >(API.Activity.Index, {
      params: payload.paginate,
    });

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const FindActivityByIdService = async (id: number) => {
  try {
    const response = await API_HOPE_PROTECTED.get<API_RESPONSE<DetailActivity>>(
      `${API.Activity.Index}/${id}`,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const CreateActivityService = async (payload: DetailActivity) => {
  try {
    const response = await API_HOPE_PROTECTED.post<
      API_RESPONSE<SingleActivity>
    >(API.Activity.Index, {
      ...payload,
    });

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const DeleteActivityService = async (id: string) => {
  try {
    const response = await API_HOPE_PROTECTED.delete<API_SINGLE_RESPONSE>(
      `${API.Activity.Index}/${id}`,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
