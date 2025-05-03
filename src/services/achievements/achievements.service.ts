import { API_HOPE_PROTECTED, defaultPayload } from '@/config';
import { API } from '@/constants/ApiUrls';
import {
  Achievement,
  FiltersAchievement,
  PayloadAchievement,
  PayloadAssignAchievement,
} from '@/models/schema';
import { API_PAYLOAD, API_RESPONSE, API_SINGLE_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';
import { valuesWithData } from '@/utils/objects';

export const ListAchievementService = async (
  payload: API_PAYLOAD = defaultPayload,
  filters?: FiltersAchievement,
) => {
  console.log(filters, 'filters');
  try {
    const response = await API_HOPE_PROTECTED.get<API_RESPONSE<Achievement[]>>(
      API.Achievement.Index,
      {
        params: {
          ...payload.paginate,
          ...filters,
        },
      },
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const CreateAchievementService = async (payload: PayloadAchievement) => {
  try {
    const response = await API_HOPE_PROTECTED.post<API_RESPONSE<Achievement>>(
      API.Achievement.Index,
      {
        ...payload,
      },
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const EditAchievementService = async (
  payload: PayloadAchievement,
  id: number,
) => {
  try {
    const validatePayload = valuesWithData(payload);
    const response = await API_HOPE_PROTECTED.put<API_RESPONSE<Achievement>>(
      `${API.Achievement.Index}/${id}`,
      {
        ...validatePayload,
      },
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const AssignAchievementService = async (
  payload: PayloadAssignAchievement,
) => {
  try {
    const response = await API_HOPE_PROTECTED.post<API_RESPONSE<Achievement>>(
      API.Achievement.Assign,
      {
        ...payload,
      },
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const UnassignAchievementService = async (
  payload: PayloadAssignAchievement,
) => {
  try {
    const response = await API_HOPE_PROTECTED.post<API_SINGLE_RESPONSE>(
      API.Achievement.Unassign,
      {
        ...payload,
      },
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const DeleteAchievementService = async (id: number) => {
  try {
    const response = await API_HOPE_PROTECTED.delete<API_SINGLE_RESPONSE>(
      `${API.Achievement.Index}/${id}`,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
