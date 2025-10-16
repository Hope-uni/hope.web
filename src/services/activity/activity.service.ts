import { API_HOPE_PROTECTED, defaultPayload } from '@/config';
import { API } from '@/constants/ApiUrls';
import {
  DetailActivity,
  PayloadActivity,
  PayloadAssignActivity,
  SingleActivity,
} from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE, API_SINGLE_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axiosUtils';

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

export const CreateActivityService = async (payload: PayloadActivity) => {
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

export const AssignActivityService = async (payload: PayloadAssignActivity) => {
  try {
    const response = await API_HOPE_PROTECTED.post<API_SINGLE_RESPONSE>(
      API.Activity.Assign,
      {
        ...payload,
      },
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const UnassignActivityService = async (patientId: number) => {
  try {
    const response = await API_HOPE_PROTECTED.post<API_SINGLE_RESPONSE>(
      API.Activity.Unassign,
      {
        patientId,
      },
    );

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
