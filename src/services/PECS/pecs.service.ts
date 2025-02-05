import { API_HOPE_PROTECTED } from '@/config';
import { API } from '@/constants/ApiUrls';
import { TEAGrade, TEAPhase } from '@/models/schema';
import { API_RESPONSE } from '@/models/types';
import { axiosErrorHandler } from '@/utils/axios';

export const ListPhaseService = async () => {
  try {
    const response = await API_HOPE_PROTECTED.get<API_RESPONSE<TEAPhase[]>>(
      API.PECS.ListPhase,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

export const ListDegreeService = async () => {
  try {
    const response = await API_HOPE_PROTECTED.get<API_RESPONSE<TEAGrade[]>>(
      API.PECS.ListDegree,
    );

    return response.data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
};
